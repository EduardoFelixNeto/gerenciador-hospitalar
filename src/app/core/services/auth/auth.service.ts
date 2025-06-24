import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import {Usuario} from "../../models/usuario.model";

export interface DecodedToken {
  sub: string; // email
  role: string; // tipo do usuário (PACIENTE, FUNCIONARIO)
  exp: number;
}

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
    const decoded: DecodedToken = jwtDecode(token);
    localStorage.setItem('userRole', decoded.role);
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  isFuncionario(): boolean {
    return this.getUserRole() === 'FUNCIONARIO';
  }

  isPaciente(): boolean {
    return this.getUserRole() === 'PACIENTE';
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

  listarFuncionarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}?tipo=FUNCIONARIO&ativo=true`);
  }

  inativarFuncionario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  atualizarFuncionario(payload: {
    tipo: string;
    endereco: string;
    pontos: number;
    cpf: string;
    nome: string;
    id: number | undefined;
    email: string;
    cep: string
  }) {
    return this.http.put<void>(`${this.apiUrl}/atualizar-funcionario`, payload, { responseType: 'text' as 'json' });
  }
}
