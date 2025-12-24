import { useState } from "react";
import { MapPin, Calendar, Users, Clock } from "lucide-react";
import AppPageHeader from "@/components/app/AppPageHeader";
import AppBottomNav from "@/components/app/AppBottomNav";

type TabType = "todos" | "eventos" | "encontros";

const compromissos = [
  {
    id: 1,
    type: "evento",
    title: "Piquenique no Parque",
    location: "Parque Ibirapuera - SP",
    date: "15 Jan 2025",
    time: "10:00",
    attendees: 24,
  },
  {
    id: 2,
    type: "encontro",
    title: "Café da manhã entre mães",
    location: "Padaria Central - SP",
    date: "18 Jan 2025",
    time: "09:00",
    attendees: 8,
  },
  {
    id: 3,
    type: "evento",
    title: "Cinema ao Ar Livre",
    location: "Parque Villa-Lobos - SP",
    date: "25 Jan 2025",
    time: "19:00",
    attendees: 80,
  },
  {
    id: 4,
    type: "encontro",
    title: "Playdate no parque",
    location: "Parque do Povo - SP",
    date: "19 Jan 2025",
    time: "15:00",
    attendees: 5,
  },
];

const AppCompromissos = () => {
  const [activeTab, setActiveTab] = useState<TabType>("todos");

  const filteredCompromissos = compromissos.filter(item => {
    if (activeTab === "todos") return true;
    if (activeTab === "eventos") return item.type === "evento";
    if (activeTab === "encontros") return item.type === "encontro";
    return true;
  });

  // Sort by date
  const sortedCompromissos = [...filteredCompromissos].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppPageHeader title="Meus Compromissos" />

      {/* Content */}
      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Tabs */}
        <div className="flex gap-2 bg-secondary rounded-2xl p-1">
          {[
            { id: "todos", label: "Todos" },
            { id: "eventos", label: "Eventos" },
            { id: "encontros", label: "Encontros" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="text-2xl font-bold text-foreground">
              {compromissos.filter(c => c.type === "evento").length}
            </div>
            <div className="text-sm text-muted-foreground">Eventos confirmados</div>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border">
            <div className="text-2xl font-bold text-foreground">
              {compromissos.filter(c => c.type === "encontro").length}
            </div>
            <div className="text-sm text-muted-foreground">Encontros confirmados</div>
          </div>
        </div>

        {/* Timeline */}
        <h2 className="font-bold text-foreground text-lg">Próximos compromissos</h2>

        <div className="space-y-3 pb-4">
          {sortedCompromissos.map((item, index) => (
            <div 
              key={item.id}
              className="flex gap-4"
            >
              {/* Timeline indicator */}
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${
                  item.type === "evento" ? "bg-accent" : "bg-primary"
                }`} />
                {index < sortedCompromissos.length - 1 && (
                  <div className="w-0.5 flex-1 bg-border mt-1" />
                )}
              </div>

              {/* Card */}
              <div className="flex-1 bg-card rounded-2xl p-4 border border-border shadow-sm mb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      item.type === "evento" 
                        ? "bg-accent/20 text-accent" 
                        : "bg-primary/20 text-primary"
                    }`}>
                      {item.type === "evento" ? "Evento" : "Encontro"}
                    </span>
                    <h3 className="font-bold text-foreground mt-2">{item.title}</h3>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground mt-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-accent" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-primary" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-primary" />
                    <span>{item.attendees} confirmados</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AppBottomNav />
    </div>
  );
};

export default AppCompromissos;
