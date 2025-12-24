import { ChevronLeft, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

interface AppPageHeaderProps {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
}

const AppPageHeader = ({ title, showBack = true, showNotification = true }: AppPageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Blue background with rounded bottom */}
      <div className="bg-primary absolute inset-x-0 top-0 h-full overflow-hidden rounded-b-[2rem]">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        {/* Logo watermark */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-10">
          <img src={logo} alt="" className="h-24" />
        </div>
      </div>
      
      <div className="relative z-10 px-4 pt-4 pb-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          {showBack ? (
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center text-primary-foreground"
            >
              <ChevronLeft size={24} />
            </button>
          ) : (
            <div className="w-10" />
          )}
          <h1 className="text-lg font-bold text-primary-foreground">{title}</h1>
          {showNotification ? (
            <button className="w-10 h-10 flex items-center justify-center text-primary-foreground relative">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full" />
            </button>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </div>
    </div>
  );
};

export default AppPageHeader;
