import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import logoOrange from "@/assets/logo-orange.png";

const AppLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular login - será conectado ao backend depois
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login realizado!",
        description: "Bem-vindo de volta ao Vila.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header laranja */}
      <div className="h-32 bg-accent rounded-b-[2rem]" />

      {/* Card de login */}
      <div className="flex-1 px-6 -mt-16">
        <div className="bg-primary rounded-2xl p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-primary-foreground text-center mb-8">
            Faça seu login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60"
              required
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-primary border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/60"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground text-lg font-bold rounded-full mt-6"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <Link
            to="/app/esqueci-senha"
            className="block text-center text-primary-foreground/80 underline mt-4 text-sm"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        {/* Seção de cadastro */}
        <div className="text-center mt-8 space-y-4">
          <p className="text-foreground/70">Ainda não tem cadastro?</p>
          <Link to="/app/cadastro">
            <Button
              variant="outline"
              className="px-12 py-3 rounded-full border-2 border-foreground text-foreground font-semibold"
            >
              Cadastrar-se
            </Button>
          </Link>

          <div className="pt-4">
            <p className="text-accent font-semibold">
              Sua empresa quer participar?
            </p>
            <Link to="/app/cadastro-empresa" className="text-accent underline font-semibold">
              Cadastre sua empresa aqui!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLogin;
