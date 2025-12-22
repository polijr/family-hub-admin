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
          className={`
            px-4 py-2.5 rounded-full text-sm font-medium 
            transition-all duration-200 border-2
            ${
              isSelected(option)
                ? "bg-gradient-to-r from-accent to-vila-orange-light text-white border-transparent shadow-md shadow-accent/20"
                : "bg-primary-foreground/5 text-primary-foreground/70 border-primary-foreground/10 hover:border-accent/30 hover:bg-primary-foreground/10"
            }
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ChipSelect;
