import { FastifyRequest, FastifyReply } from "fastify";
import { CreateDocumentUseCase } from "../../application/use-cases/create-document.use-case.js";
import { ListDocumentsUseCase } from "../../application/use-cases/list-documents.use-case.js";
import { UpdateDocumentStatusUseCase } from "../../application/use-cases/update-document-status.use-case.js";
import { DeleteDocumentUseCase } from "../../application/use-cases/delete-document.use-case.js";
import {
  CreateDocumentDTO,
  UpdateDocumentStatusDTO,
} from "../../application/dtos/document.dto.js";

export class DocumentController {
  constructor(
    private readonly createDocumentUseCase: CreateDocumentUseCase,
    private readonly listDocumentsUseCase: ListDocumentsUseCase,
    private readonly updateDocumentStatusUseCase: UpdateDocumentStatusUseCase,
    private readonly deleteDocumentUseCase: DeleteDocumentUseCase,
  ) {}

  async create(
    request: FastifyRequest<{ Body: CreateDocumentDTO }>,
    reply: FastifyReply,
  ) {
    const document = await this.createDocumentUseCase.execute(request.body);
    return reply.status(201).send(document);
  }

  async list(_request: FastifyRequest, reply: FastifyReply) {
    const documents = await this.listDocumentsUseCase.execute();
    return reply.status(200).send(documents);
  }

  async updateStatus(
    request: FastifyRequest<{
      Params: { id: string };
      Body: UpdateDocumentStatusDTO;
    }>,
    reply: FastifyReply,
  ) {
    const document = await this.updateDocumentStatusUseCase.execute(
      request.params.id,
      request.body,
    );
    return reply.status(200).send(document);
  }

  async delete(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    await this.deleteDocumentUseCase.execute(request.params.id);
    return reply.status(204).send();
  }
}
