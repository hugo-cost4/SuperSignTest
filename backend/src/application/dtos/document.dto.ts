import { DocumentStatus } from "../../domain/entities/document.entity.js";

export interface CreateDocumentDTO {
  titulo: string;
  descricao: string;
}

export interface UpdateDocumentStatusDTO {
  status: DocumentStatus;
}

export interface DocumentResponseDTO {
  id: string;
  titulo: string;
  descricao: string;
  status: DocumentStatus;
  criadoEm: string;
}
