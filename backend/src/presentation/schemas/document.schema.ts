export const createDocumentSchema = {
  body: {
    type: "object",
    required: ["titulo", "descricao"],
    properties: {
      titulo: { type: "string", minLength: 1 },
      descricao: { type: "string", minLength: 1 },
    },
    additionalProperties: false,
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "string" },
        titulo: { type: "string" },
        descricao: { type: "string" },
        status: { type: "string" },
        criadoEm: { type: "string" },
      },
    },
  },
} as const;

export const listDocumentsSchema = {
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          titulo: { type: "string" },
          descricao: { type: "string" },
          status: { type: "string" },
          criadoEm: { type: "string" },
        },
      },
    },
  },
} as const;

export const updateDocumentStatusSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  body: {
    type: "object",
    required: ["status"],
    properties: {
      status: { type: "string", enum: ["PENDENTE", "ASSINADO"] },
    },
    additionalProperties: false,
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        titulo: { type: "string" },
        descricao: { type: "string" },
        status: { type: "string" },
        criadoEm: { type: "string" },
      },
    },
  },
} as const;

export const deleteDocumentSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  response: {
    204: {
      type: "null",
    },
  },
} as const;
