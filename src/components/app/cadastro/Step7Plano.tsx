import { CadastroData } from "@/types/cadastro";

interface Step7PlanoProps {
  data: CadastroData;
  onChange: (data: Partial<CadastroData>) => void;
}

const planos = [
  {
    id: "basico" as const,
    nome: "Básico",
    descricao: "Acesso à plataforma e divulgação.",
    preco: "R$ 49,90/mês",
  },
  {
    id: "profissional" as const,
    nome: "Profissional",
    descricao: "Inclui destaque e relatórios.",
    preco: "R$ 99,90/mês",
  },
  {
    id: "premium" as const,
    nome: "Premium",
    descricao: "Todos os benefícios, suporte e eventos.",
    preco: "R$ 199,90/mês",
  },
];

const Step7Plano = ({ data, onChange }: Step7PlanoProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-primary-foreground">
          Escolha o Plano
        </h2>
      </div>

      <div className="space-y-4">
        {planos.map((plano) => (
          <button
            key={plano.id}
            type="button"
            onClick={() => onChange({ planoSelecionado: plano.id })}
            className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
              data.planoSelecionado === plano.id
                ? "border-accent bg-accent/10"
                : "border-primary-foreground/30 hover:border-primary-foreground/50"
            }`}
          >
            <h3 className="font-bold text-primary-foreground text-lg">
              {plano.nome}
            </h3>
            <p className="text-primary-foreground/70 text-sm mt-1">
              {plano.descricao}
            </p>
            <p className="text-accent font-bold mt-2">{plano.preco}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step7Plano;
