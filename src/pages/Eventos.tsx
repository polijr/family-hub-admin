import { useState, useMemo } from "react";
import { FilterBar } from "@/components/admin/FilterBar";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// TODO: integrar com endpoint real do backend
// Exemplo: const { data: events } = useQuery(['events'], () => fetch('/api/events').then(res => res.json()))

interface Event {
  id: string;
  name: string;
  company: string;
  type: "oficial" | "comunitario";
  status: "ativo" | "pendente";
  date: string;
}

const mockEvents: Event[] = [
  { id: "1", name: "Festival de Verão", company: "Parque Aventura Kids", type: "oficial", status: "ativo", date: "2024-02-15" },
  { id: "2", name: "Oficina de Arte", company: "Teatro Infantil Sonhos", type: "comunitario", status: "pendente", date: "2024-02-20" },
  { id: "3", name: "Dia da Família", company: "Restaurante Família Feliz", type: "oficial", status: "pendente", date: "2024-03-01" },
];

const Eventos = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState(mockEvents);

  const filteredEvents = useMemo(() => {
    if (!search) return events;
    const searchLower = search.toLowerCase();
    return events.filter(event => 
      event.name.toLowerCase().includes(searchLower) ||
      event.company.toLowerCase().includes(searchLower)
    );
  }, [search, events]);

  const handleApprove = (id: string) => {
    // TODO: integrar com endpoint real do backend
    // Exemplo: await fetch(`/api/events/${id}/approve`, { method: 'POST' })
    setEvents(prev => 
      prev.map(e => e.id === id ? { ...e, status: "ativo" as const } : e)
    );
    toast({
      title: "Evento aprovado",
      description: "O evento foi aprovado com sucesso.",
    });
  };

  const handleRemove = (id: string) => {
    // TODO: integrar com endpoint real do backend
    // Exemplo: await fetch(`/api/events/${id}`, { method: 'DELETE' })
    setEvents(prev => prev.filter(e => e.id !== id));
    toast({
      title: "Evento removido",
      description: "O evento foi removido do sistema.",
      variant: "destructive",
    });
  };

  const columns = [
    { key: "name", header: "Nome do Evento" },
    { key: "company", header: "Empresa" },
    { 
      key: "type", 
      header: "Tipo",
      render: (event: Event) => <StatusBadge status={event.type} />
    },
    { 
      key: "date", 
      header: "Data",
      render: (event: Event) => new Date(event.date).toLocaleDateString('pt-BR')
    },
    { 
      key: "actions", 
      header: "Ações",
      render: (event: Event) => (
        <div className="flex gap-2">
          {event.status === "pendente" && (
            <Button 
              size="sm" 
              variant="accent"
              onClick={(e) => { e.stopPropagation(); handleApprove(event.id); }}
            >
              <Check className="w-4 h-4" />
              Aprovar
            </Button>
          )}
          <Button 
            size="sm" 
            variant="destructive"
            onClick={(e) => { e.stopPropagation(); handleRemove(event.id); }}
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
      <h1 className="page-header">Gerenciar Eventos</h1>

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar por nome ou empresa..."
      />

      <DataTable
        columns={columns}
        data={filteredEvents}
        emptyMessage="Nenhum evento encontrado"
      />
    </div>
  );
};

export default Eventos;
