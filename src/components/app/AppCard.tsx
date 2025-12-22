import { ReactNode } from "react";

interface AppCardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
}

const AppCard = ({ children, className = "", elevated = true }: AppCardProps) => {
  return (
    <div 
      className={`
        bg-gradient-to-b from-primary via-primary to-primary/95
        rounded-3xl relative overflow-hidden
        ${elevated ? "shadow-2xl shadow-primary/30" : "shadow-lg"}
        ${className}
      `}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl" />
      
      {/* Decorative corner accent */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
      <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-secondary/10 rounded-full blur-xl" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AppCard;
