import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AppBackground from "@/components/app/AppBackground";
import AppHeader from "@/components/app/AppHeader";
import AppCard from "@/components/app/AppCard";
import AppInput from "@/components/app/AppInput";
import AppButton from "@/components/app/AppButton";

const AppEsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para recuperar sua senha.",
      });
    }, 1500);
  };

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

          {!emailSent ? (
            <>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                  <Mail size={28} className="text-accent" />
                </div>
              </div>

              <h1 className="text-2xl font-extrabold text-primary-foreground text-center mb-3">
                Esqueceu sua senha?
              </h1>

              <p className="text-primary-foreground/60 text-center mb-8 text-sm">
                Sem problemas! Digite seu email e enviaremos um link mágico para você redefinir sua senha.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <AppInput
                  type="email"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail size={20} />}
                  required
                />

                <div className="pt-4">
                  <AppButton
                    type="submit"
                    isLoading={isLoading}
                    className="w-full"
                    rightIcon={!isLoading && <Send size={18} />}
                  >
                    {isLoading ? "Enviando..." : "Enviar link"}
                  </AppButton>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl scale-150" />
                <div className="relative w-20 h-20 bg-gradient-to-br from-accent to-vila-orange-light rounded-full flex items-center justify-center">
                  <CheckCircle size={36} className="text-white" />
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-primary-foreground mb-3">
                Email enviado!
              </h2>
              
              <p className="text-primary-foreground/60 mb-8">
                Enviamos um link para <span className="text-accent font-semibold">{email}</span> com instruções para recuperar sua senha.
              </p>
              
              <Link to="/app/login">
                <AppButton variant="secondary" className="px-8">
                  Voltar ao login
                </AppButton>
              </Link>
            </div>
          )}
        </AppCard>
      </div>
    </AppBackground>
  );
};

export default AppEsqueciSenha;
