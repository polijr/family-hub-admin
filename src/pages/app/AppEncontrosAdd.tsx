import { useState } from "react";
import { MapPin, Calendar, Clock, Users, Image, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppPageHeader from "@/components/app/AppPageHeader";
import AppButton from "@/components/app/AppButton";
import { toast } from "sonner";

const AppEncontrosAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    maxAttendees: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.location || !formData.date || !formData.time) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }
    toast.success("Encontro criado com sucesso!");
    navigate("/app/encontros/meus");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppPageHeader title="Criar Encontro" showNotification={false} />

      {/* Content */}
      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Title */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Título do encontro *
          </label>
          <input
            type="text"
            placeholder="Ex: Café da manhã entre mães"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full h-12 px-4 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Descrição
          </label>
          <textarea
            placeholder="Descreva o encontro..."
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Local *
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Onde será o encontro?"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Data *
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-border bg-card text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Horário *
            </label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-border bg-card text-foreground focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Max Attendees */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Número máximo de participantes
          </label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="number"
              placeholder="Ex: 10"
              value={formData.maxAttendees}
              onChange={(e) => handleChange("maxAttendees", e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Image upload placeholder */}
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Imagem de capa
          </label>
          <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-muted-foreground">
            <Image size={32} className="mb-2" />
            <span className="text-sm">Toque para adicionar uma imagem</span>
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4 pb-8">
          <AppButton onClick={handleSubmit} className="w-full">
            Criar Encontro
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default AppEncontrosAdd;
