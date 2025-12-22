import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AppBackground from "@/components/app/AppBackground";
import AppHeader from "@/components/app/AppHeader";
import AppCard from "@/components/app/AppCard";
import AppInput from "@/components/app/AppInput";
import AppButton from "@/components/app/AppButton";

const AppRecuperarSenha = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Senha redefinida!",
        description: "Sua senha foi alterada com sucesso.",
      });
      navigate("/app/login");
    }, 1500);
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (password.length === 0) return { width: "0%", color: "bg-primary-foreground/20", label: "" };
    if (password.length < 6) return { width: "33%", color: "bg-destructive", label: "Fraca" };
    if (password.length < 10) return { width: "66%", color: "bg-yellow-500", label: "Média" };
    return { width: "100%", color: "bg-green-500", label: "Forte" };
  };

  const strength = getPasswordStrength();

  return (
    <AppBackground>
      <AppHeader height="md" showLogo={false} />

      <div className="flex-1 px-5 -mt-8 pb-8">
        <AppCard className="p-8">
          <Link 
            to="/app/login" 
            className="inline-flex items-center text-primary-foreground/60 hover:text-primary-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar
          </Link>

          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
              <ShieldCheck size={28} className="text-accent" />
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-primary-foreground text-center mb-3">
            Criar nova senha
          </h1>

          <p className="text-primary-foreground/60 text-center mb-8 text-sm">
            Escolha uma senha forte e segura para proteger sua conta.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <AppInput
                placeholder="Nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={20} />}
                isPassword
                required
              />
              
              {/* Password strength bar */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 bg-primary-foreground/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: strength.width }}
                    />
                  </div>
                  <p className="text-xs text-primary-foreground/50 text-right">
                    Força: <span className="font-medium">{strength.label}</span>
                  </p>
                </div>
              )}
            </div>

            <AppInput
              placeholder="Confirmar nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock size={20} />}
              isPassword
              required
            />

            <div className="pt-4">
              <AppButton
                type="submit"
                isLoading={isLoading}
                className="w-full"
              >
                {isLoading ? "Salvando..." : "Salvar nova senha"}
              </AppButton>
            </div>
          </form>
        </AppCard>
      </div>
    </AppBackground>
  );
};

export default AppRecuperarSenha;
