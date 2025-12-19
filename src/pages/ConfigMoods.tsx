import { useState, useMemo } from "react";
import { Plus, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// TODO: integrar com endpoint real do backend
// Exemplo: const { data: moods } = useQuery(['moods'], () => fetch('/api/moods').then(res => res.json()))

interface Mood {
  id: string;
  name: string;
  imageUrl?: string; // Preparado para imagem futura
}

const mockMoods: Mood[] = [
  { id: "1", name: "Aventura" },
  { id: "2", name: "Relaxante" },
  { id: "3", name: "Educativo" },
  { id: "4", name: "Cultural" },
  { id: "5", name: "Ao ar livre" },
];

const ConfigMoods = () => {
  const { toast } = useToast();
  const [moods, setMoods] = useState(mockMoods);
  const [search, setSearch] = useState("");
  const [newMood, setNewMood] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredMoods = useMemo(() => {
    if (!search) return moods;
    return moods.filter(mood => 
      mood.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, moods]);

  const handleAdd = () => {
    if (!newMood.trim()) return;
    // TODO: integrar com endpoint real do backend
    // Exemplo: await fetch('/api/moods', { method: 'POST', body: JSON.stringify({ name: newMood }) })
    const mood: Mood = {
      id: Date.now().toString(),
      name: newMood.trim(),
    };
    setMoods(prev => [mood, ...prev]);
    setNewMood("");
    toast({ title: "Mood adicionado", description: `"${mood.name}" foi adicionado com sucesso.` });
  };

  const handleRemove = (id: string) => {
    // TODO: integrar com endpoint real do backend
    // Exemplo: await fetch(`/api/moods/${id}`, { method: 'DELETE' })
    setMoods(prev => prev.filter(m => m.id !== id));
    toast({ title: "Mood removido", variant: "destructive" });
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 animate-fade-in">
      <h2 className="text-lg font-semibold text-foreground mb-4">Gerenciar Moods</h2>

      {/* Add and filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2 flex-1">
          <Input
            value={newMood}
            onChange={(e) => setNewMood(e.target.value)}
            placeholder="Nome do novo mood..."
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
            placeholder="Filtrar moods..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Moods grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMoods.map((mood) => (
          <div
            key={mood.id}
            className="relative group"
            onMouseEnter={() => setHoveredId(mood.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className={cn(
              "aspect-square rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-secondary/30 transition-all duration-200",
              "hover:border-accent hover:bg-accent/5"
            )}>
              {/* Placeholder para imagem futura */}
              <span className="text-sm font-medium text-foreground text-center px-2">
                {mood.name}
              </span>
            </div>
            {hoveredId === mood.id && (
              <button
                onClick={() => handleRemove(mood.id)}
                className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        {filteredMoods.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground py-8">
            Nenhum mood encontrado
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfigMoods;
