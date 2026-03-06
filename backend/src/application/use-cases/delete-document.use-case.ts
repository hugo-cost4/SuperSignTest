import { IDocumentRepository } from "../../domain/repositories/document.repository.js";
import { AppError } from "../../shared/errors/app-error.js";

export class DeleteDocumentUseCase {
  constructor(private readonly documentRepository: IDocumentRepository) {}

  async execute(id: string): Promise<void> {
    const document = await this.documentRepository.findById(id);

    if (!document) {
      throw new AppError("Documento não encontrado", 404);
    }

    await this.documentRepository.delete(id);
  }
}
