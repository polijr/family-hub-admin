import { CadastroData } from "@/types/cadastro";
import { Checkbox } from "@/components/ui/checkbox";

interface Step6TermosProps {
  data: CadastroData;
  onChange: (data: Partial<CadastroData>) => void;
}

const Step6Termos = ({ data, onChange }: Step6TermosProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary-foreground">
          Uma última coisa antes de você começar
        </h2>
      </div>

      <div className="space-y-6 pt-4">
        <div className="flex items-start gap-4">
          <Checkbox
            id="termos"
            checked={data.aceitaTermos}
            onCheckedChange={(checked) => onChange({ aceitaTermos: checked as boolean })}
            className="mt-1 border-primary-foreground/50 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
          />
          <label htmlFor="termos" className="text-primary-foreground cursor-pointer">
            Eu concordo com os{" "}
            <a href="#" className="text-accent underline">
              Termos e Condições
            </a>
          </label>
        </div>

        <div className="flex items-start gap-4">
          <Checkbox
            id="politica"
            checked={data.aceitaPolitica}
            onCheckedChange={(checked) => onChange({ aceitaPolitica: checked as boolean })}
            className="mt-1 border-primary-foreground/50 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
          />
          <label htmlFor="politica" className="text-primary-foreground cursor-pointer">
            Eu concordo com a{" "}
            <a href="#" className="text-accent underline">
              Política de Privacidade
            </a>
          </label>
        </div>

        <div className="flex items-start gap-4">
          <Checkbox
            id="rastreamento"
            checked={data.aceitaRastreamento}
            onCheckedChange={(checked) => onChange({ aceitaRastreamento: checked as boolean })}
            className="mt-1 border-primary-foreground/50 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
          />
          <label htmlFor="rastreamento" className="text-primary-foreground cursor-pointer">
            Eu permito o rastreamento para personalizar minha experiência no app{" "}
            <a href="#" className="text-accent underline">
              Saiba mais sobre porque estamos perguntando isto
            </a>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Step6Termos;
