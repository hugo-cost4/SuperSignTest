export type DocumentStatus = "PENDENTE" | "ASSINADO";

export interface Document {
  id: string;
  titulo: string;
  descricao: string;
  status: DocumentStatus;
  criadoEm: string;
}

export interface CreateDocumentDTO {
  titulo: string;
  descricao: string;
}

export interface UpdateDocumentStatusDTO {
  status: DocumentStatus;
}
