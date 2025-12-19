import { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// TODO: integrar com endpoint real do backend
// Exemplo: const { data: prices } = useQuery(['prices'], () => fetch('/api/prices').then(res => res.json()))

interface Price {
  id: string;
  label: string;
  type: "user" | "company";
  regular: number;
  promotional?: number;
}

const mockPrices: Price[] = [
  { id: "1", label: "Assinatura Usuário Mensal", type: "user", regular: 29.90, promotional: 19.90 },
  { id: "2", label: "Assinatura Usuário Anual", type: "user", regular: 299.90, promotional: 199.90 },
  { id: "3", label: "Plano Empresa Básico", type: "company", regular: 99.90 },
  { id: "4", label: "Plano Empresa Premium", type: "company", regular: 299.90, promotional: 249.90 },
];

const formatCurrency = (value: number) => 
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const ConfigPrecos = () => {
  const { toast } = useToast();
  const [prices, setPrices] = useState(mockPrices);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ regular: "", promotional: "" });

  const handleEdit = (price: Price) => {
    setEditingId(price.id);
    setEditValues({
      regular: price.regular.toString(),
      promotional: price.promotional?.toString() || "",
    });
  };

  const handleSave = (id: string) => {
    // TODO: integrar com endpoint real do backend
    // Exemplo: await fetch(`/api/prices/${id}`, { method: 'PUT', body: JSON.stringify(editValues) })
    setPrices(prev => prev.map(p => {
      if (p.id !== id) return p;
      return {
        ...p,
        regular: parseFloat(editValues.regular) || p.regular,
        promotional: editValues.promotional ? parseFloat(editValues.promotional) : undefined,
      };
    }));
    setEditingId(null);
    toast({ title: "Preço atualizado" });
  };

  const userPrices = prices.filter(p => p.type === "user");
  const companyPrices = prices.filter(p => p.type === "company");

  const PriceCard = ({ price }: { price: Price }) => {
    const isEditing = editingId === price.id;
    const hasPromo = price.promotional !== undefined;

    return (
      <div className="p-4 rounded-lg bg-secondary/30 border border-border/30">
        <div className="flex items-start justify-between mb-3">
          <p className="font-medium text-foreground">{price.label}</p>
          {!isEditing && (
            <Button size="sm" variant="ghost" onClick={() => handleEdit(price)}>
              <Pencil className="w-4 h-4" />
            </Button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Preço Regular</label>
              <Input
                value={editValues.regular}
                onChange={(e) => setEditValues(prev => ({ ...prev, regular: e.target.value }))}
                placeholder="0.00"
                type="number"
                step="0.01"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Preço Promocional (opcional)</label>
              <Input
                value={editValues.promotional}
                onChange={(e) => setEditValues(prev => ({ ...prev, promotional: e.target.value }))}
                placeholder="0.00"
                type="number"
                step="0.01"
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="accent" onClick={() => handleSave(price.id)}>
                <Check className="w-4 h-4" /> Salvar
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                <X className="w-4 h-4" /> Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-baseline gap-3">
            <span className={cn(
              "text-2xl font-bold",
              hasPromo ? "text-muted-foreground line-through text-lg" : "text-foreground"
            )}>
              {formatCurrency(price.regular)}
            </span>
            {hasPromo && (
              <span className="text-2xl font-bold text-accent">
                {formatCurrency(price.promotional!)}
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Admin view */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50">
        <h2 className="text-lg font-semibold text-foreground mb-4">Gerenciar Preços</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User prices */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Preços para Usuários
            </h3>
            <div className="space-y-3">
              {userPrices.map(price => <PriceCard key={price.id} price={price} />)}
            </div>
          </div>

          {/* Company prices */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Preços para Empresas
            </h3>
            <div className="space-y-3">
              {companyPrices.map(price => <PriceCard key={price.id} price={price} />)}
            </div>
          </div>
        </div>
      </div>

      {/* User preview */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-accent/30">
        <h2 className="text-lg font-semibold text-foreground mb-2">Prévia do Usuário</h2>
        <p className="text-sm text-muted-foreground mb-4">Como os preços aparecem no app</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {prices.map(price => (
            <div key={price.id} className="p-4 rounded-xl bg-gradient-to-br from-secondary/50 to-secondary/20 border border-border/50 text-center">
              <p className="text-sm text-muted-foreground mb-2">{price.label}</p>
              {price.promotional ? (
                <div>
                  <span className="text-sm text-muted-foreground line-through mr-2">
                    {formatCurrency(price.regular)}
                  </span>
                  <span className="text-xl font-bold text-accent">
                    {formatCurrency(price.promotional)}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-foreground">
                  {formatCurrency(price.regular)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfigPrecos;
