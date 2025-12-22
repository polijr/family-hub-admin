import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CadastroData, initialCadastroData } from "@/types/cadastro";
import AppBackground from "@/components/app/AppBackground";
import AppCard from "@/components/app/AppCard";
import AppButton from "@/components/app/AppButton";
import Step1DadosBasicos from "@/components/app/cadastro/Step1DadosBasicos";
import Step2Perfil from "@/components/app/cadastro/Step2Perfil";
import Step3Filhos from "@/components/app/cadastro/Step3Filhos";
import Step4BioInteresses from "@/components/app/cadastro/Step4BioInteresses";
import Step5Expectativas from "@/components/app/cadastro/Step5Expectativas";
import Step6Termos from "@/components/app/cadastro/Step6Termos";
import Step7Plano from "@/components/app/cadastro/Step7Plano";

const TOTAL_STEPS = 7;

const stepTitles = [
  "Dados básicos",
  "Seu perfil",
  "Seus filhos",
  "Sobre você",
  "Expectativas",
  "Termos",
  "Escolha seu plano",
];

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
    console.log("Enviando dados para o backend:", data);

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
    return "Continuar";
  };

  const progressPercentage = ((currentStep + 1) / TOTAL_STEPS) * 100;

  return (
    <AppBackground>
      {/* Custom header with progress */}
      <div className="relative overflow-hidden">
        <div className="h-28 bg-gradient-to-br from-accent via-accent to-vila-orange-light">
          {/* Decorative shapes */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute top-4 right-10 w-12 h-12 bg-white/5 rounded-full" />
        </div>
        
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex-1 px-5 -mt-8 pb-6">
        <AppCard className="p-6 min-h-[calc(100vh-8rem)] flex flex-col">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-4">
            {currentStep > 0 ? (
              <button
                onClick={handleBack}
                className="text-primary-foreground/60 hover:text-primary-foreground flex items-center transition-colors"
              >
                <ArrowLeft size={20} className="mr-1" />
                Voltar
              </button>
            ) : (
              <Link 
                to="/app/login" 
                className="text-primary-foreground/60 hover:text-primary-foreground flex items-center transition-colors"
              >
                <ArrowLeft size={20} className="mr-1" />
                Login
              </Link>
            )}
            
            {/* Step indicator */}
            <div className="flex items-center gap-2">
              <span className="text-accent font-bold text-lg">
                {currentStep + 1}
              </span>
              <span className="text-primary-foreground/40">
                de {TOTAL_STEPS}
              </span>
            </div>
          </div>

          {/* Step title */}
          <h2 className="text-xl font-bold text-primary-foreground mb-1">
            {stepTitles[currentStep]}
          </h2>
          
          {/* Step dots indicator */}
          <div className="flex items-center gap-1.5 mb-6">
            {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? "w-6 bg-accent"
                    : index < currentStep
                    ? "w-1.5 bg-accent/50"
                    : "w-1.5 bg-primary-foreground/20"
                }`}
              />
            ))}
          </div>

          {/* Step content */}
          <div className="flex-1 overflow-y-auto mb-6">
            {renderStep()}
          </div>

          {/* Next button */}
          <div className="mt-auto">
            <AppButton
              onClick={handleNext}
              isLoading={isLoading}
              className="w-full"
              rightIcon={!isLoading && currentStep < TOTAL_STEPS - 1 && <ChevronRight size={20} />}
            >
              {getButtonText()}
            </AppButton>
          </div>
        </AppCard>
      </div>
    </AppBackground>
  );
};

export default AppCadastro;
