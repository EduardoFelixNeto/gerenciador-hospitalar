export interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  senha?: string; // opcional, pois geralmente não é exibida no frontend
  tipo: TipoUsuario;
  cep?: string;
  endereco?: string;
  pontos?: number;
}

export enum TipoUsuario {
  PACIENTE = 'PACIENTE',
  FUNCIONARIO = 'FUNCIONARIO'
}
