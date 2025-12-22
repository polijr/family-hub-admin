interface ChipSelectProps {
  options: string[];
  selected: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
}

const ChipSelect = ({ options, selected, onChange, multiple = false }: ChipSelectProps) => {
  const isSelected = (option: string) => {
    if (multiple && Array.isArray(selected)) {
      return selected.includes(option);
    }
    return selected === option;
  };

  const handleClick = (option: string) => {
    if (multiple && Array.isArray(selected)) {
      if (selected.includes(option)) {
        onChange(selected.filter((s) => s !== option));
      } else {
        onChange([...selected, option]);
      }
    } else {
      onChange(option);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => handleClick(option)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
            isSelected(option)
              ? "bg-accent text-accent-foreground border-accent"
              : "bg-transparent text-primary-foreground border-primary-foreground/40 hover:border-primary-foreground/70"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ChipSelect;
