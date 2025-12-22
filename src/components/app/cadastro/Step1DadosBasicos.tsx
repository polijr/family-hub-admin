import { Input } from "@/components/ui/input";
import { CadastroData } from "@/types/cadastro";
import ChipSelect from "@/components/app/ChipSelect";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface Step1DadosBasicosProps {
  data: CadastroData;
  onChange: (data: Partial<CadastroData>) => void;
}

const nacionalidades = ["Brasileira", "Argentina", "Chilena", "Uruguaia", "Outra"];

const Step1DadosBasicos = ({ data, onChange }: Step1DadosBasicosProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary-foreground text-center mb-6">
        Cadastro
      </h2>

      <Input
        placeholder="Nome"
        value={data.nome}
        onChange={(e) => onChange({ nome: e.target.value })}
        className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60"
      />

      <Input
        placeholder="Sobrenome"
        value={data.sobrenome}
        onChange={(e) => onChange({ sobrenome: e.target.value })}
        className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60"
      />

      <Input
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => onChange({ email: e.target.value })}
        className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60"
      />

      <div>
        <label className="text-sm font-medium text-primary-foreground mb-2 block">
          Nacionalidade
        </label>
        <ChipSelect
          options={nacionalidades}
          selected={data.nacionalidade}
          onChange={(value) => onChange({ nacionalidade: value as string })}
        />
      </div>

      <Input
        placeholder="CPF/ID"
        value={data.documento}
        onChange={(e) => onChange({ documento: e.target.value })}
        className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60"
      />

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
          value={data.senha}
          onChange={(e) => onChange({ senha: e.target.value })}
          className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 pr-12"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/60"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="relative">
        <Input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirmar senha"
          value={data.confirmarSenha}
          onChange={(e) => onChange({ confirmarSenha: e.target.value })}
          className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 pr-12"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/60"
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <Input
        placeholder="Endereço"
        value={data.endereco}
        onChange={(e) => onChange({ endereco: e.target.value })}
        className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60"
      />

      <Input
        placeholder="CEP"
        value={data.cep}
        onChange={(e) => onChange({ cep: e.target.value })}
        className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60"
      />
    </div>
  );
};

export default Step1DadosBasicos;
