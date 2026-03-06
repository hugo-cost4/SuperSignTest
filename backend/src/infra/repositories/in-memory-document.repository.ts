import { IDocumentRepository } from "../../domain/repositories/document.repository.js";
import {
  Document,
  DocumentStatus,
} from "../../domain/entities/document.entity.js";
import { randomUUID } from "crypto";

export class InMemoryDocumentRepository implements IDocumentRepository {
  private documents: Document[] = [];

  async create(data: { titulo: string; descricao: string }): Promise<Document> {
    const document: Document = {
      id: randomUUID(),
      titulo: data.titulo,
      descricao: data.descricao,
      status: DocumentStatus.PENDENTE,
      criadoEm: new Date(),
    };

    this.documents.push(document);
    return document;
  }

  async findAll(): Promise<Document[]> {
    return [...this.documents].sort(
      (a, b) => b.criadoEm.getTime() - a.criadoEm.getTime(),
    );
  }

  async findById(id: string): Promise<Document | null> {
    return this.documents.find((doc) => doc.id === id) ?? null;
  }

  async updateStatus(id: string, status: DocumentStatus): Promise<Document> {
    const index = this.documents.findIndex((doc) => doc.id === id);
    if (index === -1) throw new Error("Document not found");
    this.documents[index] = { ...this.documents[index], status };
    return this.documents[index];
  }

  async delete(id: string): Promise<void> {
    this.documents = this.documents.filter((doc) => doc.id !== id);
  }
}
