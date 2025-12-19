import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "ativo" | "inativo" | "pendente" | "suspeito" | "aprovado" | "oficial" | "comunitario";
  className?: string;
}

const statusConfig = {
  ativo: { label: "Ativo", className: "bg-green-100 text-green-700" },
  inativo: { label: "Inativo", className: "bg-gray-100 text-gray-600" },
  pendente: { label: "Pendente", className: "bg-amber-100 text-amber-700" },
  suspeito: { label: "Suspeito", className: "bg-red-100 text-red-700" },
  aprovado: { label: "Aprovado", className: "bg-green-100 text-green-700" },
  oficial: { label: "Oficial", className: "bg-primary/10 text-primary" },
  comunitario: { label: "Comunitário", className: "bg-secondary text-secondary-foreground" },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
};
