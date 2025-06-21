export interface Agendamento {
  id: number;
  data: string;
  especialidade: string;
  medico: string;
  status: 'CRIADO' | 'CHECK-IN' | 'COMPARECEU' | 'REALIZADO' | 'CANCELADO';
}
