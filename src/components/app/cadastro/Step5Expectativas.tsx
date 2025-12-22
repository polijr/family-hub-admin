import { CadastroData } from "@/types/cadastro";
import ChipSelect from "@/components/app/ChipSelect";

interface Step5ExpectativasProps {
  data: CadastroData;
  onChange: (data: Partial<CadastroData>) => void;
}

const expectativasOptions = [
  "Mesma composição familiar",
  "Número de filhos",
  "Gênero do filho",
  "Gênero do adulto",
  "Mesma religião",
  "Idade dos filhos",
  "Idioma nativo do adulto",
  "Nível de escolaridade",
  "Idioma nativo dos filhos",
  "Necessidade específica",
  "Buscar eventos",
  "Encontrar grupos",
  "Organizar eventos",
  "Encontros em menores grupos",
];

const Step5Expectativas = ({ data, onChange }: Step5ExpectativasProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-primary-foreground">
          O que você espera do Vila?
        </h2>
        <p className="text-sm text-primary-foreground/70 mt-2">
          Marque quantos quiser - isso nos ajuda a personalizar sua experiência
        </p>
      </div>

      <ChipSelect
        options={expectativasOptions}
        selected={data.expectativasVila}
        onChange={(value) => onChange({ expectativasVila: value as string[] })}
        multiple
      />
    </div>
  );
};

export default Step5Expectativas;
