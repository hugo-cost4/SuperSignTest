import { FastifyInstance } from "fastify";
import { DocumentController } from "../controllers/document.controller.js";
import {
  createDocumentSchema,
  listDocumentsSchema,
  updateDocumentStatusSchema,
  deleteDocumentSchema,
} from "../schemas/document.schema.js";

export function documentRoutes(
  app: FastifyInstance,
  controller: DocumentController,
) {
  app.post(
    "/documents",
    { schema: createDocumentSchema },
    controller.create.bind(controller),
  );

  app.get(
    "/documents",
    { schema: listDocumentsSchema },
    controller.list.bind(controller),
  );

  app.patch(
    "/documents/:id/status",
    { schema: updateDocumentStatusSchema },
    controller.updateStatus.bind(controller),
  );

  app.delete(
    "/documents/:id",
    { schema: deleteDocumentSchema },
    controller.delete.bind(controller),
  );
}
