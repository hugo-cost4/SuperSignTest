import { IDocumentRepository } from "../../domain/repositories/document.repository.js";
import {
  Document,
  DocumentStatus,
} from "../../domain/entities/document.entity.js";
import { PrismaClient } from "@prisma/client";

export class PrismaDocumentRepository implements IDocumentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: { titulo: string; descricao: string }): Promise<Document> {
    const documento = await this.prisma.documento.create({
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
      },
    });

    return this.toDomain(documento);
  }

  async findAll(): Promise<Document[]> {
    const documentos = await this.prisma.documento.findMany({
      orderBy: { criadoEm: "desc" },
    });

    return documentos.map(this.toDomain);
  }

  async findById(id: string): Promise<Document | null> {
    const documento = await this.prisma.documento.findUnique({
      where: { id },
    });

    if (!documento) return null;

    return this.toDomain(documento);
  }

  async updateStatus(id: string, status: DocumentStatus): Promise<Document> {
    const documento = await this.prisma.documento.update({
      where: { id },
      data: { status },
    });

    return this.toDomain(documento);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.documento.delete({
      where: { id },
    });
  }

  private toDomain(raw: {
    id: string;
    titulo: string;
    descricao: string;
    status: string;
    criadoEm: Date;
  }): Document {
    return {
      id: raw.id,
      titulo: raw.titulo,
      descricao: raw.descricao,
      status: raw.status as DocumentStatus,
      criadoEm: raw.criadoEm,
    };
  }
}
