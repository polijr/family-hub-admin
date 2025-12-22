import { Input } from "@/components/ui/input";
import { CadastroData } from "@/types/cadastro";
import ChipSelect from "@/components/app/ChipSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step2PerfilProps {
  data: CadastroData;
  onChange: (data: Partial<CadastroData>) => void;
}

const idiomas = ["Português", "Espanhol", "Inglês", "Francês", "Holandês", "Outro"];
const composicoes = ["Pai/Mãe solo", "Relacionamento", "Solteiro(a)", "Viúvo(a)", "Casado(a)"];
const orientacoes = ["Heterossexual", "Homossexual", "Bissexual", "Outro"];
const escolaridades = ["Fundamental", "Médio", "Superior", "Pós-graduação"];
const religioes = ["Católica", "Evangélica", "Espírita", "Ateu", "Outra"];

const Step2Perfil = ({ data, onChange }: Step2PerfilProps) => {
  return (
    <div className="space-y-5">
      <div>
        <label className="text-sm font-medium text-primary-foreground mb-2 block">
          Gênero
        </label>
        <ChipSelect
          options={["Mulher", "Homem"]}
          selected={data.genero === "mulher" ? "Mulher" : data.genero === "homem" ? "Homem" : ""}
          onChange={(value) => onChange({ genero: (value as string).toLowerCase() as "mulher" | "homem" })}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-primary-foreground mb-2 block">
          Data de Nascimento
        </label>
        <Input
          type="date"
          value={data.dataNascimento}
          onChange={(e) => onChange({ dataNascimento: e.target.value })}
          className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-primary-foreground mb-2 block">
          Idioma nativo
        </label>
        <Select value={data.idiomaNativo} onValueChange={(value) => onChange({ idiomaNativo: value })}>
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
        {data.idiomaNativo === "Outro" && (
          <Input
            placeholder="Qual idioma?"
            value={data.outroIdioma || ""}
            onChange={(e) => onChange({ outroIdioma: e.target.value })}
            className="h-12 mt-2 bg-primary border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60"
          />
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-primary-foreground mb-2 block">
          Composição familiar
        </label>
        <Select value={data.composicaoFamiliar} onValueChange={(value) => onChange({ composicaoFamiliar: value })}>
          <SelectTrigger className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {composicoes.map((comp) => (
              <SelectItem key={comp} value={comp}>
                {comp}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-primary-foreground mb-2 block">
          Orientação sexual
        </label>
        <Select value={data.orientacaoSexual} onValueChange={(value) => onChange({ orientacaoSexual: value })}>
          <SelectTrigger className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            {orientacoes.map((ori) => (
              <SelectItem key={ori} value={ori}>
                {ori}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-primary-foreground mb-2 block">
          Nível de escolaridade
        </label>
        <ChipSelect
          options={escolaridades}
          selected={data.nivelEscolaridade}
          onChange={(value) => onChange({ nivelEscolaridade: value as string })}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-primary-foreground mb-2 block">
          Religião
        </label>
        <ChipSelect
          options={religioes}
          selected={data.religiao}
          onChange={(value) => onChange({ religiao: value as string })}
        />
      </div>
    </div>
  );
};

export default Step2Perfil;
