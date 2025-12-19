import { useState, useMemo } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// TODO: integrar com endpoint real do backend
// Exemplo: const { data: affinities } = useQuery(['affinities'], () => fetch('/api/affinities').then(res => res.json()))

// NOTA: Esta página é VISUALMENTE IDÊNTICA às Categorias, apenas muda a origem dos dados

interface Affinity {
  id: string;
  name: string;
  usersCount: number;
}

const mockAffinities: Affinity[] = [
  { id: "1", name: "Pet-friendly", usersCount: 523 },
  { id: "2", name: "Acessibilidade", usersCount: 287 },
  { id: "3", name: "Trocadores", usersCount: 412 },
  { id: "4", name: "Área Kids", usersCount: 356 },
  { id: "5", name: "Cardápio Infantil", usersCount: 289 },
];

const ConfigAfinidades = () => {
  const { toast } = useToast();
  const [affinities, setAffinities] = useState(mockAffinities);
  const [search, setSearch] = useState("");
  const [newAffinity, setNewAffinity] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const filteredAffinities = useMemo(() => {
    if (!search) return affinities;
    return affinities.filter(aff => 
      aff.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, affinities]);

  const handleAdd = () => {
    if (!newAffinity.trim()) return;
    // TODO: integrar com endpoint real do backend
    const affinity: Affinity = {
      id: Date.now().toString(),
      name: newAffinity.trim(),
      usersCount: 0,
    };
    setAffinities(prev => [affinity, ...prev]);
    setNewAffinity("");
    toast({ title: "Afinidade adicionada" });
  };

  const handleEdit = (id: string) => {
    if (!editValue.trim()) return;
    // TODO: integrar com endpoint real do backend
    setAffinities(prev => prev.map(a => a.id === id ? { ...a, name: editValue.trim() } : a));
    setEditingId(null);
    toast({ title: "Afinidade atualizada" });
  };

  const handleRemove = (id: string) => {
    // TODO: integrar com endpoint real do backend
    setAffinities(prev => prev.filter(a => a.id !== id));
    toast({ title: "Afinidade removida", variant: "destructive" });
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 animate-fade-in">
      <h2 className="text-lg font-semibold text-foreground mb-4">Gerenciar Afinidades</h2>

      {/* Add and filter bar - MESMO PADRÃO VISUAL das Categorias */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2 flex-1">
          <Input
            value={newAffinity}
            onChange={(e) => setNewAffinity(e.target.value)}
            placeholder="Nome da nova afinidade..."
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            className="max-w-xs"
          />
          <Button variant="accent" onClick={handleAdd}>
            <Plus className="w-4 h-4" />
            Adicionar
          </Button>
        </div>
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrar afinidades..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Affinities list - MESMO LAYOUT das Categorias */}
      <div className="space-y-2">
        {filteredAffinities.map((affinity) => (
          <div
            key={affinity.id}
            className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            {editingId === affinity.id ? (
              <div className="flex gap-2 flex-1">
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEdit(affinity.id)}
                  autoFocus
                  className="max-w-xs"
                />
                <Button size="sm" onClick={() => handleEdit(affinity.id)}>Salvar</Button>
                <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancelar</Button>
              </div>
            ) : (
              <>
                <div>
                  <p className="font-medium text-foreground">{affinity.name}</p>
                  <p className="text-sm text-muted-foreground">{affinity.usersCount} pessoas utilizando</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => { setEditingId(affinity.id); setEditValue(affinity.name); }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleRemove(affinity.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
        {filteredAffinities.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            Nenhuma afinidade encontrada
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfigAfinidades;
