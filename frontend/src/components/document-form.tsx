"use client";

import { useState } from "react";
import { DocumentService } from "../services/document.service";
import { CreateDocumentDTO } from "../types/document";

interface DocumentFormProps {
  onSuccess: () => void;
}

export function DocumentForm({ onSuccess }: DocumentFormProps) {
  const [formData, setFormData] = useState<CreateDocumentDTO>({
    titulo: "",
    descricao: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.titulo.trim() || !formData.descricao.trim()) {
        throw new Error("Título e descrição são obrigatórios.");
      }

      await DocumentService.create(formData);
      setFormData({ titulo: "", descricao: "" });
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Erro ao criar documento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel form-container">
      <h2 className="title-gradient">Novo Documento</h2>

      {error && <div className="alert-error fade-in">{error}</div>}

      <form onSubmit={handleSubmit} className="document-form">
        <div className="form-group">
          <label htmlFor="titulo">Título do Documento</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ex: Contrato de Prestação de Serviços"
            disabled={loading}
            className="input-field truncate-placeholder"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Breve descrição sobre o conteúdo do documento..."
            rows={4}
            disabled={loading}
            className="input-field"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary ripple-effect"
        >
          {loading ? <span className="spinner"></span> : "Criar Documento"}
        </button>
      </form>
    </div>
  );
}
