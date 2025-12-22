export interface FilhoData {
  nome: string;
  genero: "menino" | "menina" | "";
  dataNascimento: string;
  idiomaNativo: string;
  necessidadeEspecifica: string[];
  outrasNecessidades?: string;
}

export interface CadastroData {
  // Step 1 - Dados Básicos
  nome: string;
  sobrenome: string;
  email: string;
  nacionalidade: string;
  documento: string;
  senha: string;
  confirmarSenha: string;
  endereco: string;
  cep: string;

  // Step 2 - Perfil
  genero: "mulher" | "homem" | "";
  dataNascimento: string;
  idiomaNativo: string;
  outroIdioma?: string;
  composicaoFamiliar: string;
  orientacaoSexual: string;
  nivelEscolaridade: string;
  religiao: string;

  // Step 3 - Filhos
  filhos: FilhoData[];

  // Step 4 - Bio e Interesses
  bio: string;
  interessesPais: string[];
  interessesFilhos: string[];

  // Step 5 - Expectativas
  expectativasVila: string[];

  // Step 6 - Termos
  aceitaTermos: boolean;
  aceitaPolitica: boolean;
  aceitaRastreamento: boolean;

  // Step 7 - Plano
  planoSelecionado: "basico" | "profissional" | "premium" | "";
}

export const initialCadastroData: CadastroData = {
  nome: "",
  sobrenome: "",
  email: "",
  nacionalidade: "Brasileira",
  documento: "",
  senha: "",
  confirmarSenha: "",
  endereco: "",
  cep: "",
  genero: "",
  dataNascimento: "",
  idiomaNativo: "Português",
  composicaoFamiliar: "",
  orientacaoSexual: "",
  nivelEscolaridade: "",
  religiao: "",
  filhos: [],
  bio: "",
  interessesPais: [],
  interessesFilhos: [],
  expectativasVila: [],
  aceitaTermos: false,
  aceitaPolitica: false,
  aceitaRastreamento: false,
  planoSelecionado: "",
};
