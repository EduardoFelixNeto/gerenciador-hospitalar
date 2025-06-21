import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, {
      email,
      senha
    });
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserId(): Observable<number> {
    const token = this.getToken();
    if (!token) throw new Error('Token não encontrado');

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const email = payload?.sub;
      if (!email) throw new Error('Email não encontrado no token');

      return this.getUserIdFromEmail(email);
    } catch (e) {
      console.error('Erro ao decodificar token JWT', e);
      throw e;
    }
  }

  getUserIdFromEmail(email: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/buscar-id?email=${email}`);
  }

}
