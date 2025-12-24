import { useState } from "react";
import { Search, X, MapPin, Calendar, Users, Heart } from "lucide-react";
import AppPageHeader from "@/components/app/AppPageHeader";
import AppBottomNav from "@/components/app/AppBottomNav";

const filters = [
  { id: "perto", label: "Perto de mim" },
  { id: "ar-livre", label: "Ar livre" },
  { id: "local-fechado", label: "Local fechado" },
  { id: "family-friendly", label: "Family friendly" },
  { id: "gratuito", label: "Gratuito" },
  { id: "fim-semana", label: "Fim de semana" },
];

const allEventos = [
  {
    id: 1,
    title: "Piquenique no Parque",
    location: "Parque Ibirapuera - SP",
    date: "15 Jan 2025",
    time: "10:00",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    attendees: 24,
    tags: ["ar-livre", "family-friendly", "gratuito"],
  },
  {
    id: 2,
    title: "Encontro de Famílias",
    location: "Praia de Copacabana - RJ",
    date: "20 Jan 2025",
    time: "09:00",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    attendees: 42,
    tags: ["ar-livre", "family-friendly", "perto"],
  },
  {
    id: 3,
    title: "Workshop de Artesanato",
    location: "Centro Cultural - SP",
    date: "22 Jan 2025",
    time: "14:00",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop",
    attendees: 15,
    tags: ["local-fechado", "family-friendly"],
  },
  {
    id: 4,
    title: "Cinema ao Ar Livre",
    location: "Parque Villa-Lobos - SP",
    date: "25 Jan 2025",
    time: "19:00",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=300&fit=crop",
    attendees: 80,
    tags: ["ar-livre", "family-friendly", "fim-semana"],
  },
  {
    id: 5,
    title: "Brunch em Família",
    location: "Restaurante Jardim - SP",
    date: "28 Jan 2025",
    time: "11:00",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    attendees: 18,
    tags: ["local-fechado", "fim-semana"],
  },
];

const AppEventos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredEventos = allEventos.filter(evento => {
    // Search filter
    const matchesSearch = evento.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evento.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tags filter
    const matchesTags = activeFilters.length === 0 || 
      activeFilters.some(filter => evento.tags.includes(filter));
    
    return matchesSearch && matchesTags;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppPageHeader title="Eventos" />

      {/* Content */}
      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Buscar eventos..."
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

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          <span className="text-sm font-semibold text-foreground flex-shrink-0">Filtros</span>
          <div className="w-px h-4 bg-border mx-1" />
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                activeFilters.includes(filter.id)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {filteredEventos.length} evento{filteredEventos.length !== 1 ? "s" : ""} encontrado{filteredEventos.length !== 1 ? "s" : ""}
          </span>
          {activeFilters.length > 0 && (
            <button 
              onClick={() => setActiveFilters([])}
              className="text-sm text-accent font-medium"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Events list */}
        <div className="space-y-4 pb-4">
          {filteredEventos.map((evento) => (
            <div 
              key={evento.id}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm"
            >
              <div className="relative h-36">
                <img 
                  src={evento.image} 
                  alt={evento.title}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                  <Heart size={16} className="text-accent" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground text-lg mb-2">{evento.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-accent" />
                    <span>{evento.location}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-primary" />
                      <span>{evento.date} às {evento.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-primary" />
                      <span>{evento.attendees} confirmados</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  {evento.tags.slice(0, 2).map(tag => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-secondary text-xs rounded-full text-secondary-foreground"
                    >
                      {filters.find(f => f.id === tag)?.label || tag}
                    </span>
                  ))}
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

export default AppEventos;
