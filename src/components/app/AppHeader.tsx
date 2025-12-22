import logoOrange from "@/assets/logo-orange.png";

interface AppHeaderProps {
  showLogo?: boolean;
  height?: "sm" | "md" | "lg";
}

const AppHeader = ({ showLogo = true, height = "md" }: AppHeaderProps) => {
  const heights = {
    sm: "h-28",
    md: "h-36",
    lg: "h-44",
  };

  return (
    <div className={`${heights[height]} relative overflow-hidden`}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent to-vila-orange-light" />
      
      {/* Decorative shapes */}
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full" />
      <div className="absolute -top-4 right-1/4 w-20 h-20 bg-white/5 rounded-full" />
      <div className="absolute top-8 -right-4 w-16 h-16 bg-white/10 rounded-full" />
      
      {/* Wave bottom */}
      <svg 
        className="absolute bottom-0 left-0 right-0 w-full"
        viewBox="0 0 375 30"
        fill="none"
        preserveAspectRatio="none"
        style={{ height: '30px' }}
      >
        <path 
          d="M0 30V10C60 25 120 30 187.5 20C255 10 315 15 375 5V30H0Z" 
          fill="hsl(var(--background))"
        />
      </svg>
      
      {/* Logo */}
      {showLogo && (
        <div className="absolute inset-0 flex items-center justify-center pb-4">
          <img src={logoOrange} alt="Vila" className="h-12 drop-shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default AppHeader;
