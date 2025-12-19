import { NavLink, Outlet, useLocation, Navigate } from "react-router-dom";
import { Palette, Tag, Heart, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsTabs = [
  { icon: Palette, label: "Moods", path: "/configuracoes/moods" },
  { icon: Tag, label: "Categorias", path: "/configuracoes/categorias" },
  { icon: Heart, label: "Afinidades", path: "/configuracoes/afinidades" },
  { icon: DollarSign, label: "Preços", path: "/configuracoes/precos" },
];

const Configuracoes = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/configuracoes";

  // Redirect to moods if on root path
  if (isRootPath) {
    return <Navigate to="/configuracoes/moods" replace />;
  }

  return (
    <div className="content-section">
      <h1 className="page-header">Configurações do App</h1>

      {/* Tabs at top */}
      <div className="flex flex-wrap gap-2 mb-6">
        {settingsTabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200",
                isActive 
                  ? "bg-accent text-accent-foreground shadow-sm" 
                  : "bg-card text-foreground hover:bg-secondary/50 border border-border/50"
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Content area - full width now */}
      <Outlet />
    </div>
  );
};

export default Configuracoes;
