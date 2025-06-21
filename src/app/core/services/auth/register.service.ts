import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/auth/register'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  register(userData: { cpf: string; nome: string; email: string; cep: string; endereco: string; senha: string; pontos: number; tipo: string }): Observable<any> {
    return this.http.post(this.apiUrl, userData, { responseType: 'text' });
  }

  getAddressByCep(cep: string): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
