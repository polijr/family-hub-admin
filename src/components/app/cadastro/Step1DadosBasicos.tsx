import { CadastroData } from "@/types/cadastro";
import ChipSelect from "@/components/app/ChipSelect";
import AppInput from "@/components/app/AppInput";
import { User, Mail, FileText, MapPin, Hash } from "lucide-react";

interface Step1DadosBasicosProps {
  data: CadastroData;
  onChange: (data: Partial<CadastroData>) => void;
}

const nacionalidades = ["Brasileira", "Argentina", "Chilena", "Uruguaia", "Outra"];

const Step1DadosBasicos = ({ data, onChange }: Step1DadosBasicosProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <AppInput
          placeholder="Nome"
          value={data.nome}
          onChange={(e) => onChange({ nome: e.target.value })}
          icon={<User size={18} />}
        />
        <AppInput
          placeholder="Sobrenome"
          value={data.sobrenome}
          onChange={(e) => onChange({ sobrenome: e.target.value })}
        />
      </div>

      <AppInput
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => onChange({ email: e.target.value })}
        icon={<Mail size={18} />}
      />

      <div>
        <label className="text-sm font-medium text-primary-foreground/70 mb-2 block">
          Nacionalidade
        </label>
        <ChipSelect
          options={nacionalidades}
          selected={data.nacionalidade}
          onChange={(value) => onChange({ nacionalidade: value as string })}
        />
      </div>

      <AppInput
        placeholder="CPF/ID"
        value={data.documento}
        onChange={(e) => onChange({ documento: e.target.value })}
        icon={<FileText size={18} />}
      />

      <AppInput
        placeholder="Senha"
        value={data.senha}
        onChange={(e) => onChange({ senha: e.target.value })}
        isPassword
      />

      <AppInput
        placeholder="Confirmar senha"
        value={data.confirmarSenha}
        onChange={(e) => onChange({ confirmarSenha: e.target.value })}
        isPassword
      />

      <AppInput
        placeholder="Endereço"
        value={data.endereco}
        onChange={(e) => onChange({ endereco: e.target.value })}
        icon={<MapPin size={18} />}
      />

      <AppInput
        placeholder="CEP"
        value={data.cep}
        onChange={(e) => onChange({ cep: e.target.value })}
        icon={<Hash size={18} />}
      />
    </div>
  );
};

export default Step1DadosBasicos;
