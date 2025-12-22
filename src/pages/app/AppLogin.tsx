import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AppBackground from "@/components/app/AppBackground";
import AppHeader from "@/components/app/AppHeader";
import AppCard from "@/components/app/AppCard";
import AppInput from "@/components/app/AppInput";
import AppButton from "@/components/app/AppButton";

const AppLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login realizado!",
        description: "Bem-vindo de volta ao Vila.",
      });
    }, 1500);
  };

  return (
    <AppBackground>
      <AppHeader height="lg" />

      <div className="flex-1 px-5 -mt-8 pb-8">
        <AppCard className="p-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={20} className="text-accent" />
            <span className="text-accent text-sm font-semibold">Bem-vindo de volta</span>
          </div>
          
          <h1 className="text-2xl font-extrabold text-primary-foreground text-center mb-8">
            Faça seu login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AppInput
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail size={20} />}
              required
            />

            <AppInput
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                Entrar
              </AppButton>
            </div>
          </form>

          <Link
            to="/app/esqueci-senha"
            className="block text-center text-primary-foreground/60 hover:text-accent mt-6 text-sm transition-colors"
          >
            Esqueceu sua senha?
          </Link>
        </AppCard>

        {/* Seção de cadastro */}
        <div className="text-center mt-10 space-y-5">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-foreground/20" />
            <p className="text-foreground/60 text-sm">Ainda não tem conta?</p>
            <div className="flex-1 h-px bg-foreground/20" />
          </div>
          
          <Link to="/app/cadastro" className="inline-block">
            <AppButton variant="outline" className="px-12">
              Cadastrar-se
            </AppButton>
          </Link>

          <div className="pt-6 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
            </div>
            <div className="relative">
              <p className="text-accent font-bold text-lg">
                Sua empresa quer participar?
              </p>
              <Link 
                to="/app/cadastro-empresa" 
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold mt-1 transition-colors"
              >
                Cadastre sua empresa aqui!
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppBackground>
  );
};

export default AppLogin;
