import { Textarea } from "@/components/ui/textarea";
import { CadastroData } from "@/types/cadastro";
import ChipSelect from "@/components/app/ChipSelect";

interface Step4BioInteressesProps {
  data: CadastroData;
  onChange: (data: Partial<CadastroData>) => void;
}

const interessesPaisOptions = [
  "Esporte",
  "Música",
  "Praia",
  "Serra",
  "Parque",
  "Teatro",
  "Cinema",
  "Viagem",
  "Arte",
  "Religião",
];

const interessesFilhosOptions = [
  "Esporte",
  "Música",
  "Brincadeiras ao ar livre",
  "Jogos",
  "Arte",
  "Leitura",
  "Natureza",
  "Tecnologia",
];

const Step4BioInteresses = ({ data, onChange }: Step4BioInteressesProps) => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-primary-foreground font-medium mb-3">
          Diga algumas palavras sobre você, sua família e o que vocês procuram no Vila.
          Capriche, pois ficará no seu perfil e acessível aos demais usuários!
        </p>
        <div className="relative">
          <Textarea
            placeholder="Conte um pouco sobre você..."
            value={data.bio}
            onChange={(e) => onChange({ bio: e.target.value.slice(0, 500) })}
            className="min-h-[120px] bg-primary border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 resize-none"
          />
          <span className="absolute bottom-2 right-3 text-xs text-primary-foreground/50">
            {data.bio.length}/500
          </span>
        </div>
      </div>

      <div>
        <p className="text-primary-foreground font-medium mb-3">
          Agora conte só para a gente quais os seus principais interesses e com quem você
          gostaria de se conectar - pode marcar quantos quiser!
        </p>

        <label className="text-sm font-medium text-primary-foreground mb-2 block">
          Interesses dos pais
        </label>
        <ChipSelect
          options={interessesPaisOptions}
          selected={data.interessesPais}
          onChange={(value) => onChange({ interessesPais: value as string[] })}
          multiple
        />
      </div>

      <div>
        <label className="text-sm font-medium text-primary-foreground mb-2 block">
          Interesses dos filhos
        </label>
        <ChipSelect
          options={interessesFilhosOptions}
          selected={data.interessesFilhos}
          onChange={(value) => onChange({ interessesFilhos: value as string[] })}
          multiple
        />
      </div>
    </div>
  );
};

export default Step4BioInteresses;
