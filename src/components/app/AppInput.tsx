import { forwardRef, InputHTMLAttributes, ReactNode, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  isPassword?: boolean;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, icon, isPassword, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/40 group-focus-within:text-accent transition-colors">
            {icon}
          </div>
        )}
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={cn(
            "w-full h-14 px-4 rounded-2xl bg-primary-foreground/5 border-2 border-primary-foreground/10",
            "text-primary-foreground placeholder:text-primary-foreground/40",
            "focus:outline-none focus:border-accent/50 focus:bg-primary-foreground/10",
            "transition-all duration-200",
            icon && "pl-12",
            isPassword && "pr-12",
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    );
  }
);

AppInput.displayName = "AppInput";

export default AppInput;
