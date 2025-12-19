import { useState, useMemo } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// TODO: integrar com endpoint real do backend
// Exemplo: const { data: categories } = useQuery(['categories'], () => fetch('/api/categories').then(res => res.json()))

interface Category {
  id: string;
  name: string;
  usersCount: number;
}

const mockCategories: Category[] = [
  { id: "1", name: "Parques", usersCount: 245 },
  { id: "2", name: "Restaurantes", usersCount: 189 },
  { id: "3", name: "Teatros", usersCount: 67 },
  { id: "4", name: "Museus", usersCount: 134 },
  { id: "5", name: "Praias", usersCount: 312 },
];

const ConfigCategorias = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState(mockCategories);
  const [search, setSearch] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const filteredCategories = useMemo(() => {
    if (!search) return categories;
    return categories.filter(cat => 
      cat.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, categories]);

  const handleAdd = () => {
    if (!newCategory.trim()) return;
    // TODO: integrar com endpoint real do backend
    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.trim(),
      usersCount: 0,
    };
    setCategories(prev => [category, ...prev]);
    setNewCategory("");
    toast({ title: "Categoria adicionada" });
  };

  const handleEdit = (id: string) => {
    if (!editValue.trim()) return;
    // TODO: integrar com endpoint real do backend
    setCategories(prev => prev.map(c => c.id === id ? { ...c, name: editValue.trim() } : c));
    setEditingId(null);
    toast({ title: "Categoria atualizada" });
  };

  const handleRemove = (id: string) => {
    // TODO: integrar com endpoint real do backend
    setCategories(prev => prev.filter(c => c.id !== id));
    toast({ title: "Categoria removida", variant: "destructive" });
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 animate-fade-in">
      <h2 className="text-lg font-semibold text-foreground mb-4">Gerenciar Categorias</h2>

      {/* Add and filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2 flex-1">
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nome da nova categoria..."
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
            placeholder="Filtrar categorias..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories list */}
      <div className="space-y-2">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            {editingId === category.id ? (
              <div className="flex gap-2 flex-1">
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEdit(category.id)}
                  autoFocus
                  className="max-w-xs"
                />
                <Button size="sm" onClick={() => handleEdit(category.id)}>Salvar</Button>
                <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancelar</Button>
              </div>
            ) : (
              <>
                <div>
                  <p className="font-medium text-foreground">{category.name}</p>
                  <p className="text-sm text-muted-foreground">{category.usersCount} pessoas utilizando</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => { setEditingId(category.id); setEditValue(category.name); }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleRemove(category.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
        {filteredCategories.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            Nenhuma categoria encontrada
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfigCategorias;
