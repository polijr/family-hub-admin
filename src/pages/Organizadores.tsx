import { useState, useMemo } from "react";
import { FilterBar } from "@/components/admin/FilterBar";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// TODO: integrar com endpoint real do backend
// Exemplo: const { data: companies } = useQuery(['companies'], () => fetch('/api/companies').then(res => res.json()))

interface Company {
  id: string;
  name: string;
  email: string;
  status: "ativo" | "pendente" | "inativo";
}

const mockCompanies: Company[] = [
  { id: "1", name: "Parque Aventura Kids", email: "contato@parqueaventura.com", status: "ativo" },
  { id: "2", name: "Restaurante Família Feliz", email: "contato@familiafeliz.com", status: "pendente" },
  { id: "3", name: "Teatro Infantil Sonhos", email: "contato@teatrosonhos.com", status: "ativo" },
];

const Organizadores = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState(mockCompanies);

  const filteredCompanies = useMemo(() => {
    if (!search) return companies;
    const searchLower = search.toLowerCase();
    return companies.filter(company => 
      company.name.toLowerCase().includes(searchLower) ||
      company.email.toLowerCase().includes(searchLower)
    );
  }, [search, companies]);

  const handleApprove = (id: string) => {
    // TODO: integrar com endpoint real do backend
    // Exemplo: await fetch(`/api/companies/${id}/approve`, { method: 'POST' })
    setCompanies(prev => 
      prev.map(c => c.id === id ? { ...c, status: "ativo" as const } : c)
    );
    toast({
      title: "Empresa aprovada",
      description: "A empresa foi aprovada com sucesso.",
    });
  };

  const handleRemove = (id: string) => {
    // TODO: integrar com endpoint real do backend
    // Exemplo: await fetch(`/api/companies/${id}`, { method: 'DELETE' })
    setCompanies(prev => prev.filter(c => c.id !== id));
    toast({
      title: "Empresa removida",
      description: "A empresa foi removida do sistema.",
      variant: "destructive",
    });
  };

  const columns = [
    { key: "name", header: "Nome da Empresa" },
    { key: "email", header: "Email" },
    { 
      key: "status", 
      header: "Status",
      render: (company: Company) => <StatusBadge status={company.status} />
    },
    { 
      key: "actions", 
      header: "Ações",
      render: (company: Company) => (
        <div className="flex gap-2">
          {company.status === "pendente" && (
            <Button 
              size="sm" 
              variant="accent"
              onClick={(e) => { e.stopPropagation(); handleApprove(company.id); }}
            >
              <Check className="w-4 h-4" />
              Aprovar
            </Button>
          )}
          <Button 
            size="sm" 
            variant="destructive"
            onClick={(e) => { e.stopPropagation(); handleRemove(company.id); }}
          >
            <X className="w-4 h-4" />
            Remover
          </Button>
        </div>
      )
    },
  ];

  return (
    <div className="content-section">
      <h1 className="page-header">Gerenciar Organizadores</h1>

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar por nome ou email..."
      />

      <DataTable
        columns={columns}
        data={filteredCompanies}
        emptyMessage="Nenhuma empresa encontrada"
      />
    </div>
  );
};

export default Organizadores;
