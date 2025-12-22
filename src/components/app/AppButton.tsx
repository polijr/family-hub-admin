import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "lg", 
    isLoading, 
    leftIcon, 
    rightIcon, 
    children, 
    disabled,
    ...props 
  }, ref) => {
    const variants = {
      primary: "bg-gradient-to-r from-accent to-vila-orange-light text-white shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 active:scale-[0.98]",
      secondary: "bg-primary-foreground/10 text-primary-foreground border-2 border-primary-foreground/20 hover:bg-primary-foreground/20",
      outline: "bg-transparent border-2 border-foreground text-foreground hover:bg-foreground/5",
      ghost: "bg-transparent text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10",
    };

    const sizes = {
      sm: "h-10 px-4 text-sm",
      md: "h-12 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <button
        className={cn(
          "relative rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

AppButton.displayName = "AppButton";

export default AppButton;
