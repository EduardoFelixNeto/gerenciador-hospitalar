import {Agendamento} from "./agendamento.model";

export interface PacienteDashboard {
  saldoPontos: number;
  agendamentos: Agendamento[];
}
