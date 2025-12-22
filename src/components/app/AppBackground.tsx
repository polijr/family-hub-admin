import { ReactNode } from "react";

interface AppBackgroundProps {
  children: ReactNode;
  variant?: "default" | "minimal";
}

const AppBackground = ({ children, variant = "default" }: AppBackgroundProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-secondary/20 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-secondary/30 rounded-full blur-2xl" />
      <div className="absolute bottom-20 -right-10 w-32 h-32 bg-vila-orange-light/20 rounded-full blur-2xl" />
      
      {/* Decorative pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23233C64' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default AppBackground;
