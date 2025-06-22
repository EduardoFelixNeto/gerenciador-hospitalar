export interface Agendamento {
  id: number;
  codigoAgendamento: string;
  idConsulta: number;
  idPaciente: number;
  pontosUtilizados: number;
  valorPagoComplementar: number;
  dataHoraAgendamento: string;
  status: string;
}
