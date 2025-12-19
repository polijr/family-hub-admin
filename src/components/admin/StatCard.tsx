import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard = ({ title, value, icon: Icon, trend, className }: StatCardProps) => {
  return (
    <div className={cn("stat-card animate-fade-in", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className={cn(
              "text-xs font-medium mt-2",
              trend.isPositive ? "text-green-600" : "text-destructive"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}% este mês
            </p>
          )}
        </div>
        <div className="p-3 rounded-xl bg-secondary">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
};
