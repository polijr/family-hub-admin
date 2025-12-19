import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Palette, Tag, Heart, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsMenu = [
  { icon: Palette, label: "Moods", path: "/configuracoes/moods" },
  { icon: Tag, label: "Categorias", path: "/configuracoes/categorias" },
  { icon: Heart, label: "Afinidades", path: "/configuracoes/afinidades" },
  { icon: DollarSign, label: "Preços", path: "/configuracoes/precos" },
];

const Configuracoes = () => {
  const location = useLocation();
  const isRootPath = location.pathname === "/configuracoes";

  return (
    <div className="content-section">
      <h1 className="page-header">Configurações do App</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings sidebar */}
        <div className="lg:w-64 shrink-0">
          <nav className="bg-card rounded-xl p-4 shadow-sm border border-border/50">
            <ul className="space-y-1">
              {settingsMenu.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                        isActive 
                          ? "bg-accent text-accent-foreground" 
                          : "text-foreground hover:bg-secondary/50"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Content area */}
        <div className="flex-1">
          {isRootPath ? (
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border/50 text-center">
              <p className="text-muted-foreground">
                Selecione uma opção no menu para gerenciar
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
