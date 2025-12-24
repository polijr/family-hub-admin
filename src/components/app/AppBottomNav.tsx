import { MessageSquare, Calendar, Plus, Bookmark, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const AppBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "conversas", icon: MessageSquare, label: "Conversas", path: "/app/conversas" },
    { id: "calendario", icon: Calendar, label: "Calendário", path: "/app/compromissos" },
    { id: "criar", icon: Plus, label: "Criar", path: "/app/encontros/add", isMain: true },
    { id: "espaco", icon: Bookmark, label: "Meu espaço", path: "/app/encontros/meus" },
    { id: "perfil", icon: User, label: "Perfil", path: "/app/perfil" },
  ];

  return (
    <div className="sticky bottom-0 bg-accent px-4 py-3 rounded-t-[2rem]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          if (item.isMain) {
            return (
              <button 
                key={item.id}
                onClick={() => navigate(item.path)}
                className="relative -mt-6"
              >
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center border-4 border-background shadow-lg">
                  <Icon size={28} className="text-white" />
                </div>
                <span className="text-xs text-white mt-1 block text-center">{item.label}</span>
              </button>
            );
          }
          
          return (
            <button 
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 ${isActive ? "text-white" : "text-white/70"}`}
            >
              <Icon size={22} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AppBottomNav;
