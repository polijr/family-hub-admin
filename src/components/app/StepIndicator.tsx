interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-2.5 h-2.5 rounded-full transition-colors ${
            index <= currentStep
              ? "bg-accent"
              : "bg-primary-foreground/30"
          }`}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
