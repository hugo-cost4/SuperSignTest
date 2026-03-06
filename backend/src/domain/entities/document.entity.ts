export enum DocumentStatus {
  PENDENTE = "PENDENTE",
  ASSINADO = "ASSINADO",
}

export interface Document {
  id: string;
  titulo: string;
  descricao: string;
  status: DocumentStatus;
  criadoEm: Date;
}
