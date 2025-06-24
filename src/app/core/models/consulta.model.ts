export interface Consulta {
  id: number;
  dataHora: string; // ou Date se você for converter depois
  especialidade: {
    id: number;
    nome: string;
  };
  medico: string;
  valor: number;
  vagas: number;
  status: string;
  codigo: string;
  especialidadeCodigo: string;
}
