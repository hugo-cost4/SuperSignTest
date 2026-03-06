import { IDocumentRepository } from "../../domain/repositories/document.repository.js";
import {
  DocumentResponseDTO,
  UpdateDocumentStatusDTO,
} from "../dtos/document.dto.js";
import { AppError } from "../../shared/errors/app-error.js";

export class UpdateDocumentStatusUseCase {
  constructor(private readonly documentRepository: IDocumentRepository) {}

  async execute(
    id: string,
    data: UpdateDocumentStatusDTO,
  ): Promise<DocumentResponseDTO> {
    const document = await this.documentRepository.findById(id);

    if (!document) {
      throw new AppError("Documento não encontrado", 404);
    }

    const updated = await this.documentRepository.updateStatus(id, data.status);

    return {
      id: updated.id,
      titulo: updated.titulo,
      descricao: updated.descricao,
      status: updated.status,
      criadoEm: updated.criadoEm.toISOString(),
    };
  }
}
