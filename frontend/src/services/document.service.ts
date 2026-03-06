import {
  Document,
  CreateDocumentDTO,
  UpdateDocumentStatusDTO,
  DocumentStatus,
} from "../types/document";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const DocumentService = {
  async findAll(): Promise<Document[]> {
    const response = await fetch(`${API_URL}/documents`, {
      cache: "no-store", // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch documents");
    }

    return response.json();
  },

  async create(data: CreateDocumentDTO): Promise<Document> {
    const response = await fetch(`${API_URL}/documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create document");
    }

    return response.json();
  },

  async updateStatus(id: string, status: DocumentStatus): Promise<Document> {
    const response = await fetch(`${API_URL}/documents/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to update document status");
    }

    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/documents/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete document");
    }
  },
};
