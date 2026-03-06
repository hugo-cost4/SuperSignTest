import { DocumentStatus } from "../types/document";

interface StatusBadgeProps {
  status: DocumentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isPendente = status === "PENDENTE";

  return (
    <span className={`badge ${isPendente ? "badge-warning" : "badge-success"}`}>
      {status}
    </span>
  );
}
