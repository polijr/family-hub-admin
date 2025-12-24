import { useState } from "react";
import { Search, X, Plus, MapPin, Mail, MessageSquare, Calendar, Bookmark, User, ChevronLeft, ChevronRight } from "lucide-react";
import logo from "@/assets/logo.png";

const categories = [
  { id: "eventos", label: "Eventos", active: true },
  { id: "amigos", label: "Amigos", active: false },
  { id: "calendario", label: "Calendário", active: false },
  { id: "explorar", label: "Explorar", active: false },
];

const filters = [
  { id: "ar-livre", label: "Ar livre" },
  { id: "perto", label: "Perto de mim" },
  { id: "local-fechado", label: "Local fechado" },
  { id: "local-publico", label: "Local público" },
];

const destaques = [
  {
    id: 1,
    title: "Parque Tal - SP",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Praia Central - RJ",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Parque Villa-Lobos",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=400&h=300&fit=crop",
  },
];

const AppPaginaInicial = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 px-4 pt-4 pb-6">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <button className="w-10 h-10 flex items-center justify-center text-primary-foreground">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-primary-foreground">Página Inicial</h1>
            <button className="w-10 h-10 flex items-center justify-center text-primary-foreground">
              <User size={24} />
            </button>
          </div>

          {/* Logo watermark */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-10">
            <img src={logo} alt="" className="h-32" />
          </div>

          {/* Category circles */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`flex-shrink-0 w-20 h-20 rounded-full border-2 flex items-center justify-center text-xs font-semibold transition-all ${
                  cat.active
                    ? "bg-primary-foreground/20 border-primary-foreground text-primary-foreground"
                    : "bg-transparent border-primary-foreground/50 text-primary-foreground/70"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 space-y-6">
        {/* Search bar */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white flex-shrink-0">
            <Plus size={20} />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Procure eventos"
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

        {/* Destaques section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Destaques</h2>
            <button className="text-sm text-muted-foreground flex items-center gap-1">
              Ver todos <ChevronRight size={16} />
            </button>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {destaques.map((destaque) => (
                  <div key={destaque.id} className="w-full flex-shrink-0">
                    <div className="bg-secondary rounded-2xl overflow-hidden">
                      <div className="relative h-40">
                        <img 
                          src={destaque.image} 
                          alt={destaque.title}
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                          <Plus size={16} className="text-primary" />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-foreground">{destaque.title}</h3>
                          <MapPin size={16} className="text-accent" />
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {destaque.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {destaques.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === idx ? "bg-primary w-4" : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Contact section */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Mail size={20} className="text-primary" />
            <h3 className="font-bold text-foreground">Contate-nos</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Seu email</label>
              <input
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Sua mensagem</label>
              <textarea
                placeholder="Digite aqui"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-accent px-4 py-3">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1 text-white/80">
            <MessageSquare size={22} />
            <span className="text-xs">Conversas</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white/80">
            <Calendar size={22} />
            <span className="text-xs">Calendário</span>
          </button>
          <button className="relative -mt-6">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center border-4 border-accent shadow-lg">
              <Plus size={28} className="text-white" />
            </div>
            <span className="text-xs text-white mt-1 block text-center">Criar</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white/80">
            <Bookmark size={22} />
            <span className="text-xs">Meu espaço</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white/80">
            <User size={22} />
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppPaginaInicial;
