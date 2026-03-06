"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DocumentForm } from "@/components/document-form";
import { DocumentList } from "@/components/document-list";
import { DocumentService } from "@/services/document.service";
import { Document } from "@/types/document";

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      const data = await DocumentService.findAll();
      setDocuments(data);
    } catch (error) {
      console.error("Failed to fetch documents", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <main className="main-layout fade-in">
      {/* Header */}
      <header className="navbar slide-down">
        <div className="navbar-logo">
          <Image
            src="/supersign_logo.png"
            alt="SuperSign Logo"
            width={160}
            height={40}
            className="logo-img"
            priority
          />
        </div>
      </header>

      {/* App Content Section */}
      <div className="app-section">
        <div className="section-header fade-in">
          <h2>Gerencie seus Documentos</h2>
          <p>Plataforma de Assinatura Digital não é tudo igual.</p>
        </div>
        <div className="content-grid slide-up">
          <section className="column-left">
            <DocumentForm onSuccess={fetchDocuments} />
          </section>

          <section className="column-right">
            {loading ? (
              <div className="loading-state glass-panel">
                <span className="spinner large"></span>
                <p>Carregando documentos...</p>
              </div>
            ) : (
              <DocumentList documents={documents} onRefresh={fetchDocuments} />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
