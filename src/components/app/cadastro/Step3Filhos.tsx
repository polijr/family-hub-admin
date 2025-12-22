import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CadastroData, FilhoData } from "@/types/cadastro";
import ChipSelect from "@/components/app/ChipSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

interface Step3FilhosProps {
  data: CadastroData;
  onChange: (data: Partial<CadastroData>) => void;
}

const idiomas = ["Português", "Espanhol", "Inglês", "Francês", "Holandês", "Outro"];
const necessidades = [
  "TEA Nível 1",
  "TEA Nível 2",
  "TEA Nível 3",
  "Deficiência auditiva",
  "Deficiência visual",
  "Deficiência intelectual",
  "Paralisia cerebral",
  "Síndrome de Down",
  "Outras",
];

const emptyFilho: FilhoData = {
  nome: "",
  genero: "",
  dataNascimento: "",
  idiomaNativo: "Português",
  necessidadeEspecifica: [],
};

const Step3Filhos = ({ data, onChange }: Step3FilhosProps) => {
  const addFilho = () => {
    onChange({ filhos: [...data.filhos, { ...emptyFilho }] });
  };

  const removeFilho = (index: number) => {
    const newFilhos = data.filhos.filter((_, i) => i !== index);
    onChange({ filhos: newFilhos });
  };

  const updateFilho = (index: number, updates: Partial<FilhoData>) => {
    const newFilhos = data.filhos.map((filho, i) =>
      i === index ? { ...filho, ...updates } : filho
    );
    onChange({ filhos: newFilhos });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-primary-foreground">Filhos</h2>
        <p className="text-sm text-primary-foreground/70 mt-1">
          Se não tiver filhos, pode passar para o próximo
        </p>
      </div>

      {data.filhos.map((filho, index) => (
        <div key={index} className="bg-primary-foreground/5 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-primary-foreground">
              Filho {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeFilho(index)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <Input
            placeholder="Primeiro nome"
            value={filho.nome}
            onChange={(e) => updateFilho(index, { nome: e.target.value })}
            className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60"
          />

          <div>
            <label className="text-sm font-medium text-primary-foreground mb-2 block">
              Gênero
            </label>
            <ChipSelect
              options={["Menino", "Menina"]}
              selected={filho.genero === "menino" ? "Menino" : filho.genero === "menina" ? "Menina" : ""}
              onChange={(value) => updateFilho(index, { genero: (value as string).toLowerCase() as "menino" | "menina" })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-primary-foreground mb-2 block">
              Data de Nascimento
            </label>
            <Input
              type="date"
              value={filho.dataNascimento}
              onChange={(e) => updateFilho(index, { dataNascimento: e.target.value })}
              className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-primary-foreground mb-2 block">
              Idioma nativo
            </label>
            <Select
              value={filho.idiomaNativo}
              onValueChange={(value) => updateFilho(index, { idiomaNativo: value })}
            >
              <SelectTrigger className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {idiomas.map((idioma) => (
                  <SelectItem key={idioma} value={idioma}>
                    {idioma}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-primary-foreground mb-2 block">
              Necessidade específica
            </label>
            <Select
              value={filho.necessidadeEspecifica[0] || ""}
              onValueChange={(value) => updateFilho(index, { necessidadeEspecifica: [value] })}
            >
              <SelectTrigger className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground">
                <SelectValue placeholder="Selecione (opcional)" />
              </SelectTrigger>
              <SelectContent>
                {necessidades.map((nec) => (
                  <SelectItem key={nec} value={nec}>
                    {nec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {filho.necessidadeEspecifica.includes("Outras") && (
              <Input
                placeholder="Descreva a necessidade"
                value={filho.outrasNecessidades || ""}
                onChange={(e) => updateFilho(index, { outrasNecessidades: e.target.value })}
                className="h-12 mt-2 bg-primary border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60"
              />
            )}
          </div>
        </div>
      ))}

      <Button
        type="button"
        onClick={addFilho}
        variant="outline"
        className="w-full h-12 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
      >
        <Plus size={20} className="mr-2" />
        Adicionar filho
      </Button>
    </div>
  );
};

export default Step3Filhos;
