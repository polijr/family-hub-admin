import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CadastroData, initialCadastroData } from "@/types/cadastro";
import StepIndicator from "@/components/app/StepIndicator";
import Step1DadosBasicos from "@/components/app/cadastro/Step1DadosBasicos";
import Step2Perfil from "@/components/app/cadastro/Step2Perfil";
import Step3Filhos from "@/components/app/cadastro/Step3Filhos";
import Step4BioInteresses from "@/components/app/cadastro/Step4BioInteresses";
import Step5Expectativas from "@/components/app/cadastro/Step5Expectativas";
import Step6Termos from "@/components/app/cadastro/Step6Termos";
import Step7Plano from "@/components/app/cadastro/Step7Plano";

const TOTAL_STEPS = 7;

const AppCadastro = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<CadastroData>(initialCadastroData);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const updateData = (updates: Partial<CadastroData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 0:
        if (!data.nome || !data.sobrenome || !data.email || !data.senha) {
          toast({
            title: "Campos obrigatórios",
            description: "Preencha todos os campos obrigatórios.",
            variant: "destructive",
          });
          return false;
        }
        if (data.senha !== data.confirmarSenha) {
          toast({
            title: "Senhas não coincidem",
            description: "Verifique se as senhas são iguais.",
            variant: "destructive",
          });
          return false;
        }
        if (data.senha.length < 6) {
          toast({
            title: "Senha fraca",
            description: "A senha deve ter pelo menos 6 caracteres.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 1:
        if (!data.genero || !data.dataNascimento) {
          toast({
            title: "Campos obrigatórios",
            description: "Preencha gênero e data de nascimento.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 5:
        if (!data.aceitaTermos || !data.aceitaPolitica) {
          toast({
            title: "Termos obrigatórios",
            description: "Você precisa aceitar os termos para continuar.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 6:
        if (!data.planoSelecionado) {
          toast({
            title: "Selecione um plano",
            description: "Escolha um plano para finalizar o cadastro.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Aqui todos os dados serão enviados ao backend de uma vez
    console.log("Enviando dados para o backend:", data);

    // Simular envio - será conectado ao backend depois
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Cadastro realizado!",
        description: "Bem-vindo ao Vila! Seu cadastro foi concluído com sucesso.",
      });
      navigate("/app/login");
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1DadosBasicos data={data} onChange={updateData} />;
      case 1:
        return <Step2Perfil data={data} onChange={updateData} />;
      case 2:
        return <Step3Filhos data={data} onChange={updateData} />;
      case 3:
        return <Step4BioInteresses data={data} onChange={updateData} />;
      case 4:
        return <Step5Expectativas data={data} onChange={updateData} />;
      case 5:
        return <Step6Termos data={data} onChange={updateData} />;
      case 6:
        return <Step7Plano data={data} onChange={updateData} />;
      default:
        return null;
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Finalizando...";
    if (currentStep === TOTAL_STEPS - 1) return "Finalizar cadastro";
    return "Próximo";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header laranja */}
      <div className="h-24 bg-accent rounded-b-[2rem]" />

      {/* Card de cadastro */}
      <div className="flex-1 px-4 pb-6 -mt-12">
        <div className="bg-primary rounded-2xl p-6 shadow-xl min-h-[calc(100vh-8rem)]">
          {/* Navegação */}
          <div className="flex items-center justify-between mb-2">
            {currentStep > 0 ? (
              <button
                onClick={handleBack}
                className="text-primary-foreground/80 flex items-center"
              >
                <ArrowLeft size={20} className="mr-1" />
                Voltar
              </button>
            ) : (
              <Link to="/app/login" className="text-primary-foreground/80 flex items-center">
                <ArrowLeft size={20} className="mr-1" />
                Login
              </Link>
            )}
            <span className="text-primary-foreground/60 text-sm">
              {currentStep + 1}/{TOTAL_STEPS}
            </span>
          </div>

          {/* Indicador de progresso */}
          <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

          {/* Conteúdo do step */}
          <div className="mt-4 mb-6 overflow-y-auto max-h-[calc(100vh-20rem)]">
            {renderStep()}
          </div>

          {/* Botão de próximo */}
          <div className="mt-auto pt-4">
            <Button
              onClick={handleNext}
              disabled={isLoading}
              className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold rounded-full"
            >
              {getButtonText()}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppCadastro;
