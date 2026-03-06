import { describe, it, expect, beforeEach } from "vitest";
import { CreateDocumentUseCase } from "../../../src/application/use-cases/create-document.use-case.js";
import { ListDocumentsUseCase } from "../../../src/application/use-cases/list-documents.use-case.js";
import { UpdateDocumentStatusUseCase } from "../../../src/application/use-cases/update-document-status.use-case.js";
import { DeleteDocumentUseCase } from "../../../src/application/use-cases/delete-document.use-case.js";
import { IDocumentRepository } from "../../../src/domain/repositories/document.repository.js";
import {
  Document,
  DocumentStatus,
} from "../../../src/domain/entities/document.entity.js";
import { AppError } from "../../../src/shared/errors/app-error.js";

// In-memory repository for testing
class InMemoryDocumentRepository implements IDocumentRepository {
  private documents: Document[] = [];

  async create(data: { titulo: string; descricao: string }): Promise<Document> {
    const document: Document = {
      id: crypto.randomUUID(),
      titulo: data.titulo,
      descricao: data.descricao,
      status: DocumentStatus.PENDENTE,
      criadoEm: new Date(),
    };
    this.documents.push(document);
    return document;
  }

  async findAll(): Promise<Document[]> {
    return [...this.documents];
  }

  async findById(id: string): Promise<Document | null> {
    return this.documents.find((doc) => doc.id === id) ?? null;
  }

  async updateStatus(id: string, status: DocumentStatus): Promise<Document> {
    const index = this.documents.findIndex((doc) => doc.id === id);
    if (index === -1) throw new Error("Document not found");
    this.documents[index].status = status;
    return this.documents[index];
  }

  async delete(id: string): Promise<void> {
    this.documents = this.documents.filter((doc) => doc.id !== id);
  }

  // Helper to reset state between tests
  clear() {
    this.documents = [];
  }
}

describe("Document Use Cases", () => {
  let repository: InMemoryDocumentRepository;
  let createUseCase: CreateDocumentUseCase;
  let listUseCase: ListDocumentsUseCase;
  let updateStatusUseCase: UpdateDocumentStatusUseCase;
  let deleteUseCase: DeleteDocumentUseCase;

  beforeEach(() => {
    repository = new InMemoryDocumentRepository();
    createUseCase = new CreateDocumentUseCase(repository);
    listUseCase = new ListDocumentsUseCase(repository);
    updateStatusUseCase = new UpdateDocumentStatusUseCase(repository);
    deleteUseCase = new DeleteDocumentUseCase(repository);
  });

  describe("CreateDocumentUseCase", () => {
    it("should create a document with PENDENTE status", async () => {
      const result = await createUseCase.execute({
        titulo: "Contrato de Serviço",
        descricao: "Contrato para prestação de serviços",
      });

      expect(result).toHaveProperty("id");
      expect(result.titulo).toBe("Contrato de Serviço");
      expect(result.descricao).toBe("Contrato para prestação de serviços");
      expect(result.status).toBe(DocumentStatus.PENDENTE);
      expect(result.criadoEm).toBeDefined();
    });
  });

  describe("ListDocumentsUseCase", () => {
    it("should return an empty array when no documents exist", async () => {
      const result = await listUseCase.execute();
      expect(result).toEqual([]);
    });

    it("should return all created documents", async () => {
      await createUseCase.execute({
        titulo: "Doc 1",
        descricao: "Descrição 1",
      });
      await createUseCase.execute({
        titulo: "Doc 2",
        descricao: "Descrição 2",
      });

      const result = await listUseCase.execute();
      expect(result).toHaveLength(2);
    });
  });

  describe("UpdateDocumentStatusUseCase", () => {
    it("should update document status to ASSINADO", async () => {
      const created = await createUseCase.execute({
        titulo: "Contrato",
        descricao: "Descrição",
      });

      const result = await updateStatusUseCase.execute(created.id, {
        status: DocumentStatus.ASSINADO,
      });

      expect(result.status).toBe(DocumentStatus.ASSINADO);
    });

    it("should throw AppError when document does not exist", async () => {
      await expect(
        updateStatusUseCase.execute("non-existent-id", {
          status: DocumentStatus.ASSINADO,
        }),
      ).rejects.toThrow(AppError);
    });

    it("should throw AppError with 404 status code", async () => {
      try {
        await updateStatusUseCase.execute("non-existent-id", {
          status: DocumentStatus.ASSINADO,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(AppError);
        expect((error as AppError).statusCode).toBe(404);
      }
    });
  });

  describe("DeleteDocumentUseCase", () => {
    it("should delete an existing document", async () => {
      const created = await createUseCase.execute({
        titulo: "Contrato",
        descricao: "Descrição",
      });

      await deleteUseCase.execute(created.id);

      const documents = await listUseCase.execute();
      expect(documents).toHaveLength(0);
    });

    it("should throw AppError when document does not exist", async () => {
      await expect(deleteUseCase.execute("non-existent-id")).rejects.toThrow(
        AppError,
      );
    });
  });
});
