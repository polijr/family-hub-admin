import { useState } from "react";
import { MapPin, Calendar, Users, MoreVertical, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppPageHeader from "@/components/app/AppPageHeader";
import AppBottomNav from "@/components/app/AppBottomNav";

const meusEncontros = [
  {
    id: 1,
    title: "Café da manhã entre mães",
    location: "Padaria Central - SP",
    date: "18 Jan 2025",
    time: "09:00",
    attendees: 8,
    maxAttendees: 12,
    status: "ativo",
  },
  {
    id: 2,
    title: "Tarde de jogos",
    location: "Minha casa - SP",
    date: "25 Jan 2025",
    time: "14:00",
    attendees: 4,
    maxAttendees: 8,
    status: "ativo",
  },
  {
    id: 3,
    title: "Piquenique de aniversário",
    location: "Parque Ibirapuera - SP",
    date: "10 Jan 2025",
    time: "10:00",
    attendees: 15,
    maxAttendees: 20,
    status: "concluido",
  },
];

const AppEncontrosMeus = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const ativos = meusEncontros.filter(e => e.status === "ativo");
  const concluidos = meusEncontros.filter(e => e.status === "concluido");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppPageHeader title="Meus Encontros" />

      {/* Content */}
      <div className="flex-1 px-4 py-4 space-y-6">
        {/* Active encontros */}
        <div>
          <h2 className="font-bold text-foreground text-lg mb-3">Ativos ({ativos.length})</h2>
          <div className="space-y-3">
            {ativos.map((encontro) => (
              <div 
                key={encontro.id}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm relative"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-foreground pr-8">{encontro.title}</h3>
                  <button 
                    onClick={() => setActiveMenu(activeMenu === encontro.id ? null : encontro.id)}
                    className="text-muted-foreground"
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>
                
                {activeMenu === encontro.id && (
                  <div className="absolute right-4 top-12 bg-card border border-border rounded-xl shadow-lg py-2 z-10">
                    <button className="w-full px-4 py-2 flex items-center gap-2 text-sm text-foreground hover:bg-secondary">
                      <Edit size={16} />
                      Editar
                    </button>
                    <button className="w-full px-4 py-2 flex items-center gap-2 text-sm text-destructive hover:bg-secondary">
                      <Trash2 size={16} />
                      Excluir
                    </button>
                  </div>
                )}

                <div className="space-y-2 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-accent" />
                    <span>{encontro.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    <span>{encontro.date} às {encontro.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-primary" />
                    <span>{encontro.attendees}/{encontro.maxAttendees} participantes</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${(encontro.attendees / encontro.maxAttendees) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {encontro.maxAttendees - encontro.attendees} vagas restantes
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed encontros */}
        {concluidos.length > 0 && (
          <div>
            <h2 className="font-bold text-foreground text-lg mb-3">Concluídos ({concluidos.length})</h2>
            <div className="space-y-3 pb-4">
              {concluidos.map((encontro) => (
                <div 
                  key={encontro.id}
                  className="bg-card rounded-2xl p-4 border border-border shadow-sm opacity-70"
                >
                  <h3 className="font-bold text-foreground">{encontro.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary" />
                      <span>{encontro.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-primary" />
                      <span>{encontro.attendees} participaram</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AppBottomNav />
    </div>
  );
};

export default AppEncontrosMeus;
