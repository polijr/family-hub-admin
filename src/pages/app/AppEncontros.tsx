import { useState } from "react";
import { Search, X, MapPin, Calendar, Users, Plus, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppPageHeader from "@/components/app/AppPageHeader";
import AppBottomNav from "@/components/app/AppBottomNav";

const encontros = [
  {
    id: 1,
    title: "Café da manhã entre mães",
    location: "Padaria Central - SP",
    date: "18 Jan 2025",
    time: "09:00",
    organizer: "Maria Silva",
    attendees: 8,
    maxAttendees: 12,
  },
  {
    id: 2,
    title: "Playdate no parque",
    location: "Parque do Povo - SP",
    date: "19 Jan 2025",
    time: "15:00",
    organizer: "Ana Costa",
    attendees: 5,
    maxAttendees: 10,
  },
  {
    id: 3,
    title: "Grupo de leitura infantil",
    location: "Biblioteca Municipal - SP",
    date: "21 Jan 2025",
    time: "14:00",
    organizer: "Carlos Mendes",
    attendees: 12,
    maxAttendees: 15,
  },
];

const AppEncontros = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEncontros = encontros.filter(encontro =>
    encontro.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    encontro.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppPageHeader title="Encontros" />

      {/* Content */}
      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Quick actions */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/app/encontros/add")}
            className="flex-1 bg-accent text-white rounded-2xl p-4 flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Plus size={20} />
            </div>
            <div className="text-left">
              <div className="font-bold">Criar encontro</div>
              <div className="text-xs text-white/80">Organize um novo encontro</div>
            </div>
          </button>
        </div>

        <button
          onClick={() => navigate("/app/encontros/meus")}
          className="w-full bg-card border border-border rounded-2xl p-4 flex items-center justify-between"
        >
          <div className="text-left">
            <div className="font-bold text-foreground">Meus encontros</div>
            <div className="text-sm text-muted-foreground">Veja os encontros que você criou</div>
          </div>
          <ChevronRight size={20} className="text-muted-foreground" />
        </button>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Buscar encontros..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-11 rounded-full border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Section title */}
        <h2 className="font-bold text-foreground text-lg">Encontros disponíveis</h2>

        {/* Encontros list */}
        <div className="space-y-3 pb-4">
          {filteredEncontros.map((encontro) => (
            <div 
              key={encontro.id}
              className="bg-card rounded-2xl p-4 border border-border shadow-sm"
            >
              <h3 className="font-bold text-foreground mb-2">{encontro.title}</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
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
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">Por {encontro.organizer}</span>
                <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Participar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default AppEncontros;
