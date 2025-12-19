import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Calendar, 
  Settings, 
  Menu, 
  X,
  ChevronLeft
} from "lucide-react";
import logoOrange from "@/assets/logo-orange.png";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Gerenciar Usuários", path: "/usuarios" },
  { icon: Building2, label: "Gerenciar Organizadores", path: "/organizadores" },
  { icon: Calendar, label: "Gerenciar Eventos", path: "/eventos" },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const AdminSidebar = ({ isOpen, onToggle }: AdminSidebarProps) => {
  const location = useLocation();
  const isSettingsActive = location.pathname.startsWith("/configuracoes");

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar z-50 transition-all duration-300 flex flex-col",
          isOpen ? "w-64" : "w-0 lg:w-20",
          "lg:relative"
        )}
      >
        {/* Logo area */}
        <div className="h-20 flex items-center justify-center border-b border-sidebar-border px-4">
          <img 
            src={logoOrange} 
            alt="Vila" 
            className={cn(
              "transition-all duration-300",
              isOpen ? "h-12" : "h-8"
            )}
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                      isActive 
                        ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 shrink-0", isActive && "animate-pulse")} />
                    <span className={cn(
                      "font-medium whitespace-nowrap transition-opacity duration-200",
                      isOpen ? "opacity-100" : "opacity-0 lg:hidden"
                    )}>
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer with Settings and Collapse */}
        <div className="border-t border-sidebar-border p-3 space-y-2">
          {/* Settings icon */}
          <NavLink
            to="/configuracoes"
            className={cn(
              "flex items-center justify-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
              isSettingsActive 
                ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              isOpen && "justify-start"
            )}
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span className={cn(
              "font-medium whitespace-nowrap transition-opacity duration-200",
              isOpen ? "opacity-100" : "opacity-0 lg:hidden"
            )}>
              Configurações
            </span>
          </NavLink>

          {/* Collapse button - desktop only */}
          <button
            onClick={onToggle}
            className="hidden lg:flex w-full items-center justify-center h-10 rounded-lg text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <ChevronLeft className={cn("w-5 h-5 transition-transform", !isOpen && "rotate-180")} />
          </button>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-lg bg-primary text-primary-foreground shadow-lg"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </>
  );
};
