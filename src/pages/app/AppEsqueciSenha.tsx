import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AppEsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular envio de email - será conectado ao backend depois
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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header laranja */}
      <div className="h-32 bg-accent rounded-b-[2rem]" />

      {/* Card */}
      <div className="flex-1 px-6 -mt-16">
        <div className="bg-primary rounded-2xl p-8 shadow-xl">
          <Link to="/app/login" className="inline-flex items-center text-primary-foreground/80 mb-6">
            <ArrowLeft size={20} className="mr-2" />
            Voltar
          </Link>

          <h1 className="text-2xl font-bold text-primary-foreground text-center mb-4">
            Esqueceu sua senha?
          </h1>

          {!emailSent ? (
            <>
              <p className="text-primary-foreground/70 text-center mb-8">
                Digite seu email e enviaremos um link para você redefinir sua senha.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60"
                  required
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold rounded-full mt-6"
                >
                  {isLoading ? "Enviando..." : "Enviar link"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✉️</span>
              </div>
              <p className="text-primary-foreground/80 mb-6">
                Enviamos um email para <strong>{email}</strong> com instruções para recuperar sua senha.
              </p>
              <Link to="/app/login">
                <Button
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground"
                >
                  Voltar ao login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppEsqueciSenha;
