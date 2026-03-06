"use client";

import { Document, DocumentStatus } from "../types/document";
import { DocumentService } from "../services/document.service";
import { StatusBadge } from "./status-badge";
import { useState } from "react";

interface DocumentListProps {
  documents: Document[];
  onRefresh: () => void;
}

export function DocumentList({ documents, onRefresh }: DocumentListProps) {
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleToggleStatus = async (doc: Document) => {
    try {
      setProcessingId(doc.id);
      const newStatus: DocumentStatus =
        doc.status === "PENDENTE" ? "ASSINADO" : "PENDENTE";

      await DocumentService.updateStatus(doc.id, newStatus);
      onRefresh();
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Erro ao atualizar o status.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este documento?"))
      return;

    try {
      setProcessingId(id);
      await DocumentService.delete(id);
      onRefresh();
    } catch (error) {
      console.error("Failed to delete document", error);
      alert("Erro ao excluir o documento.");
    } finally {
      setProcessingId(null);
    }
  };

  if (documents.length === 0) {
    return (
      <div className="empty-state glass-panel fade-in">
        <div className="empty-icon">📄</div>
        <h3>Nenhum documento encontrado</h3>
        <p>
          Preencha o formulário ao lado para criar o seu primeiro documento.
        </p>
      </div>
    );
  }

  return (
    <div className="document-list-container glass-panel fade-in">
      <h2 className="title-gradient">Documentos Recentes</h2>

      <div className="document-grid">
        {documents.map((doc) => (
          <div key={doc.id} className="document-card slide-up">
            <div className="document-header">
              <h3 className="document-title">{doc.titulo}</h3>
              <StatusBadge status={doc.status} />
            </div>

            <p className="document-description">{doc.descricao}</p>

            <div className="document-footer">
              <span className="document-date">
                {new Date(doc.criadoEm).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>

              <div className="document-actions">
                <button
                  onClick={() => handleToggleStatus(doc)}
                  disabled={processingId === doc.id}
                  className={`btn-icon ${doc.status === "PENDENTE" ? "btn-sign" : "btn-revoke"}`}
                  title={
                    doc.status === "PENDENTE" ? "Assinar" : "Tornar Pendente"
                  }
                >
                  {doc.status === "PENDENTE" ? "✍️" : "↩️"}
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  disabled={processingId === doc.id}
                  className="btn-icon btn-delete"
                  title="Excluir"
                >
                  🗑️
                </button>
              </div>
            </div>
            {processingId === doc.id && (
              <div className="card-overlay">
                <span className="spinner"></span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
