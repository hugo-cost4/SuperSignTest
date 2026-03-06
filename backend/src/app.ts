import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { AppError } from "./shared/errors/app-error.js";
import { PrismaDocumentRepository } from "./infra/repositories/prisma-document.repository.js";
import { prisma } from "./infra/database/prisma-client.js";
import { CreateDocumentUseCase } from "./application/use-cases/create-document.use-case.js";
import { ListDocumentsUseCase } from "./application/use-cases/list-documents.use-case.js";
import { UpdateDocumentStatusUseCase } from "./application/use-cases/update-document-status.use-case.js";
import { DeleteDocumentUseCase } from "./application/use-cases/delete-document.use-case.js";
import { DocumentController } from "./presentation/controllers/document.controller.js";
import { documentRoutes } from "./presentation/routes/document.routes.js";

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: true,
  });

  app.register(cors, {
    origin: true,
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH", "HEAD"],
  });

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        statusCode: error.statusCode,
        error: error.name,
        message: error.message,
      });
    }

    if (error.validation) {
      return reply.status(400).send({
        statusCode: 400,
        error: "Validation Error",
        message: error.message,
      });
    }

    app.log.error(error);
    return reply.status(500).send({
      statusCode: 500,
      error: "Internal Server Error",
      message: "Erro interno do servidor",
    });
  });

  const documentRepository = new PrismaDocumentRepository(prisma);

  const createDocumentUseCase = new CreateDocumentUseCase(documentRepository);
  const listDocumentsUseCase = new ListDocumentsUseCase(documentRepository);
  const updateDocumentStatusUseCase = new UpdateDocumentStatusUseCase(
    documentRepository,
  );
  const deleteDocumentUseCase = new DeleteDocumentUseCase(documentRepository);

  const documentController = new DocumentController(
    createDocumentUseCase,
    listDocumentsUseCase,
    updateDocumentStatusUseCase,
    deleteDocumentUseCase,
  );

  documentRoutes(app, documentController);

  return app;
}
