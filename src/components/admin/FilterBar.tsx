import { Search, Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  onAddClick?: () => void;
  addLabel?: string;
  filters?: {
    label: string;
    active: boolean;
    onClick: () => void;
  }[];
  className?: string;
}

export const FilterBar = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  onAddClick,
  addLabel = "Adicionar",
  filters,
  className
}: FilterBarProps) => {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-3 mb-6", className)}>
      {/* Add button */}
      {onAddClick && (
        <Button variant="accent" onClick={onAddClick} className="shrink-0">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">{addLabel}</span>
        </Button>
      )}

      {/* Search input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-10"
        />
      </div>

      {/* Filter buttons */}
      {filters && filters.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={filter.onClick}
              className={cn("filter-btn", filter.active && "active")}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
