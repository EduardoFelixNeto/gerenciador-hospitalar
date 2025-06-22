import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from '../../models/consulta.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private baseUrl = 'http://localhost:3000/consultas';

  constructor(private http: HttpClient) {}

  buscarConsultas(especialidade?: string, medico?: string): Observable<Consulta[]> {
    let params = new HttpParams();
    if (especialidade) params = params.set('especialidade', especialidade);
    if (medico) params = params.set('medico', medico);

    return this.http.get<Consulta[]>(this.baseUrl, { params });
  }

  // opcional: cadastrar nova consulta (perfil funcionário)
  cadastrarConsulta(dto: any): Observable<Consulta> {
    return this.http.post<Consulta>(this.baseUrl, dto);
  }

  cancelarConsulta(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/cancelar`, {});
  }

  finalizarConsulta(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/finalizar`, {});
  }
}
