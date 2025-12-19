import { Users, Building2, UserPlus, Briefcase, MapPin } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";

// TODO: integrar com endpoint real do backend
// Exemplo: const { data: stats } = useQuery(['dashboard-stats'], () => fetch('/api/dashboard/stats').then(res => res.json()))

const mockStats = {
  totalUsers: 1247,
  totalCompanies: 89,
  newRegistrations: 34,
  companyProfiles: 76,
  familyFriendlyLocations: 152,
};

const Dashboard = () => {
  return (
    <div className="content-section">
      <h1 className="page-header">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
        <StatCard
          title="Total de Usuários"
          value={mockStats.totalUsers.toLocaleString('pt-BR')}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total de Empresas"
          value={mockStats.totalCompanies}
          icon={Building2}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Novos Cadastros"
          value={mockStats.newRegistrations}
          icon={UserPlus}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Perfis de Empresas"
          value={mockStats.companyProfiles}
          icon={Briefcase}
        />
        <StatCard
          title="Locais Family-Friendly"
          value={mockStats.familyFriendlyLocations}
          icon={MapPin}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Quick overview section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 animate-fade-in">
          <h2 className="text-lg font-semibold text-foreground mb-4">Atividade Recente</h2>
          <div className="space-y-3">
            {/* TODO: integrar com endpoint real do backend - fetch('/api/dashboard/recent-activity') */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <p className="text-sm text-foreground">Novo usuário cadastrado: Maria Silva</p>
              <span className="text-xs text-muted-foreground ml-auto">2 min</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <p className="text-sm text-foreground">Empresa aprovada: Parque Aventura</p>
              <span className="text-xs text-muted-foreground ml-auto">15 min</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <div className="w-2 h-2 rounded-full bg-vila-wine" />
              <p className="text-sm text-foreground">Evento criado: Festival de Verão</p>
              <span className="text-xs text-muted-foreground ml-auto">1h</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 animate-fade-in">
          <h2 className="text-lg font-semibold text-foreground mb-4">Pendências</h2>
          <div className="space-y-3">
            {/* TODO: integrar com endpoint real do backend - fetch('/api/dashboard/pending') */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200">
              <p className="text-sm text-foreground">Empresas aguardando aprovação</p>
              <span className="text-lg font-bold text-amber-600">3</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200">
              <p className="text-sm text-foreground">Eventos pendentes</p>
              <span className="text-lg font-bold text-amber-600">5</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-foreground">Usuários suspeitos</p>
              <span className="text-lg font-bold text-red-600">2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
