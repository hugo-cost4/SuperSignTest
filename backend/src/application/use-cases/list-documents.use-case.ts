import { IDocumentRepository } from "../../domain/repositories/document.repository.js";
import { DocumentResponseDTO } from "../dtos/document.dto.js";

export class ListDocumentsUseCase {
  constructor(private readonly documentRepository: IDocumentRepository) {}

  async execute(): Promise<DocumentResponseDTO[]> {
    const documents = await this.documentRepository.findAll();

    return documents.map((doc) => ({
      id: doc.id,
      titulo: doc.titulo,
      descricao: doc.descricao,
      status: doc.status,
      criadoEm: doc.criadoEm.toISOString(),
    }));
  }
}
