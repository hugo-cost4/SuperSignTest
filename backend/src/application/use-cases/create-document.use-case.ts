import { IDocumentRepository } from "../../domain/repositories/document.repository.js";
import {
  CreateDocumentDTO,
  DocumentResponseDTO,
} from "../dtos/document.dto.js";

export class CreateDocumentUseCase {
  constructor(private readonly documentRepository: IDocumentRepository) {}

  async execute(data: CreateDocumentDTO): Promise<DocumentResponseDTO> {
    const document = await this.documentRepository.create({
      titulo: data.titulo,
      descricao: data.descricao,
    });

    return {
      id: document.id,
      titulo: document.titulo,
      descricao: document.descricao,
      status: document.status,
      criadoEm: document.criadoEm.toISOString(),
    };
  }
}
