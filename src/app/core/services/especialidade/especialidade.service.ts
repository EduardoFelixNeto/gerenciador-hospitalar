import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Especialidade {
  codigo: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {

  private readonly baseUrl = 'http://localhost:3000/especialidades';

  constructor(private http: HttpClient) {}

  getEspecialidades(): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(this.baseUrl);
  }
}
