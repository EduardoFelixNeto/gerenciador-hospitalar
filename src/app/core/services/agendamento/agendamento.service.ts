import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../../models/agendamento.model';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  private baseUrl = 'http://localhost:3000/agendamentos';

  constructor(private http: HttpClient) {}

  agendarConsulta(idConsulta: number, dto: {
    idPaciente: number;
    valorPagoComplementar: number;
    pontosUtilizados: any
  }): Observable<Agendamento> {
    return this.http.post<Agendamento>(`${this.baseUrl}/consulta/${idConsulta}/agendar`, dto);
  }

  listarPorPaciente(pacienteId: number): Observable<Agendamento[]> {
    const params = new HttpParams().set('pacienteId', pacienteId);
    return this.http.get<Agendamento[]>(`${this.baseUrl}/por-paciente`, { params });
  }

  realizarCheckin(idAgendamento: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${idAgendamento}/checkin`, {});
  }

  confirmarComparecimento(idAgendamento: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${idAgendamento}/compareceu`, {});
  }

  cancelarAgendamento(idAgendamento: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${idAgendamento}/cancelar`, {});
  }

  getProximas48Horas(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(`${this.baseUrl}/proximas-48h`);
  }


  realizarConsulta(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/realizar`, {});
  }

  confirmarPresencaPorCodigo(codigo: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/comparecer`, { codigoAgendamento: codigo });
  }



}
