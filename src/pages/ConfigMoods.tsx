import { useState, useMemo, useRef } from "react";
import { Plus, X, Search, Upload, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// TODO: integrar com endpoint real do backend
// Exemplo: const { data: moods } = useQuery(['moods'], () => fetch('/api/moods').then(res => res.json()))

interface Mood {
  id: string;
  name: string;
  imageUrl?: string;
}

const mockMoods: Mood[] = [
  { id: "1", name: "Aventura", imageUrl: "" },
  { id: "2", name: "Relaxante", imageUrl: "" },
  { id: "3", name: "Educativo", imageUrl: "" },
  { id: "4", name: "Cultural", imageUrl: "" },
  { id: "5", name: "Ao ar livre", imageUrl: "" },
];

const ConfigMoods = () => {
  const { toast } = useToast();
  const [moods, setMoods] = useState(mockMoods);
  const [search, setSearch] = useState("");
  const [newMood, setNewMood] = useState("");
  const [newMoodImage, setNewMoodImage] = useState<string>("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMoods = useMemo(() => {
    if (!search) return moods;
    return moods.filter(mood => 
      mood.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, moods]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: integrar com storage real do backend
      // Exemplo: const url = await uploadToStorage(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMoodImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    if (!newMood.trim()) return;
    // TODO: integrar com endpoint real do backend
    // Exemplo: await fetch('/api/moods', { method: 'POST', body: JSON.stringify({ name: newMood, imageUrl }) })
    const mood: Mood = {
      id: Date.now().toString(),
      name: newMood.trim(),
      imageUrl: newMoodImage,
    };
    setMoods(prev => [mood, ...prev]);
    setNewMood("");
    setNewMoodImage("");
    toast({ title: "Mood adicionado", description: `"${mood.name}" foi adicionado com sucesso.` });
  };

  const handleRemove = (id: string) => {
    // TODO: integrar com endpoint real do backend
    // Exemplo: await fetch(`/api/moods/${id}`, { method: 'DELETE' })
    setMoods(prev => prev.filter(m => m.id !== id));
    toast({ title: "Mood removido", variant: "destructive" });
  };

  const handleMoodImageChange = (id: string, file: File) => {
    // TODO: integrar com storage real do backend
    const reader = new FileReader();
    reader.onloadend = () => {
      setMoods(prev => prev.map(m => 
        m.id === id ? { ...m, imageUrl: reader.result as string } : m
      ));
      toast({ title: "Imagem atualizada" });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 animate-fade-in">
      <h2 className="text-lg font-semibold text-foreground mb-4">Gerenciar Moods</h2>

      {/* Add and filter bar */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-2 flex-1 flex-wrap">
            <Input
              value={newMood}
              onChange={(e) => setNewMood(e.target.value)}
              placeholder="Nome do novo mood..."
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              className="max-w-xs"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              className={cn(newMoodImage && "border-accent text-accent")}
            >
              <Upload className="w-4 h-4" />
              {newMoodImage ? "Foto selecionada" : "Adicionar foto"}
            </Button>
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
        {newMoodImage && (
          <div className="flex items-center gap-2">
            <img src={newMoodImage} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-border" />
            <Button variant="ghost" size="sm" onClick={() => setNewMoodImage("")}>
              <X className="w-4 h-4" /> Remover
            </Button>
          </div>
        )}
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
            <label className={cn(
              "aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center bg-secondary/30 transition-all duration-200 cursor-pointer overflow-hidden",
              "hover:border-accent hover:bg-accent/5"
            )}>
              {mood.imageUrl ? (
                <img src={mood.imageUrl} alt={mood.name} className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleMoodImageChange(mood.id, file);
                }}
              />
              {!mood.imageUrl && (
                <span className="text-xs text-muted-foreground">Clique para adicionar</span>
              )}
            </label>
            <span className="absolute bottom-0 left-0 right-0 bg-primary/80 text-primary-foreground text-sm font-medium text-center py-1 px-2 rounded-b-xl truncate">
              {mood.name}
            </span>
            {hoveredId === mood.id && (
              <button
                onClick={() => handleRemove(mood.id)}
                className="absolute -top-2 -right-2 p-1 rounded-full bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 transition-colors z-10"
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
