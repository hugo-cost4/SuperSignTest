import { Document, DocumentStatus } from "../entities/document.entity.js";

export interface IDocumentRepository {
  create(data: { titulo: string; descricao: string }): Promise<Document>;

  findAll(): Promise<Document[]>;

  findById(id: string): Promise<Document | null>;

  updateStatus(id: string, status: DocumentStatus): Promise<Document>;

  delete(id: string): Promise<void>;
}
