import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Calendar, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/admin/StatusBadge";

// TODO: integrar com endpoint real do backend
// Exemplo: const { data: user } = useQuery(['user', id], () => fetch(`/api/users/${id}`).then(res => res.json()))

const mockUserDetail = {
  id: "1",
  name: "Maria Silva",
  email: "maria@email.com",
  phone: "(11) 99999-9999",
  registrationDate: "2024-01-15",
  status: "ativo" as const,
  address: "São Paulo, SP",
  children: [
    { id: "c1", name: "Lucas Silva", age: 5, birthDate: "2019-03-15" },
    { id: "c2", name: "Sofia Silva", age: 3, birthDate: "2021-08-20" },
  ],
};

const UsuarioDetalhe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: integrar com endpoint real - usar id para buscar dados
  const user = mockUserDetail;

  return (
    <div className="content-section">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="page-header mb-0">Detalhes do Usuário</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <div className="lg:col-span-2 bg-card rounded-xl p-6 shadow-sm border border-border/50 animate-fade-in">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <StatusBadge status={user.status} className="mt-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary/30">
              <p className="text-sm text-muted-foreground mb-1">Telefone</p>
              <p className="font-medium text-foreground">{user.phone}</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30">
              <p className="text-sm text-muted-foreground mb-1">Localização</p>
              <p className="font-medium text-foreground">{user.address}</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30">
              <p className="text-sm text-muted-foreground mb-1">Data de Cadastro</p>
              <p className="font-medium text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(user.registrationDate).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30">
              <p className="text-sm text-muted-foreground mb-1">Quantidade de Filhos</p>
              <p className="font-medium text-foreground flex items-center gap-2">
                <Baby className="w-4 h-4" />
                {user.children.length}
              </p>
            </div>
          </div>
        </div>

        {/* Children Card */}
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-4">Filhos</h3>
          <div className="space-y-3">
            {user.children.map((child) => (
              <div key={child.id} className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <p className="font-medium text-foreground">{child.name}</p>
                <p className="text-sm text-muted-foreground">
                  {child.age} anos • Nascimento: {new Date(child.birthDate).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
            {user.children.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                Nenhum filho cadastrado
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsuarioDetalhe;
