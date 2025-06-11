import React from 'react';
import { cn } from '@/lib/utils'; // Assuming 'cn' for classnames is available

interface Step {
  id: string | number;
  name: string;
  status?: 'completed' | 'current' | 'upcoming'; // Optional status for more detailed styling
}

interface MultiStepProgressIndicatorProps {
  steps: Step[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void; // Optional: allow clicking on steps
  className?: string;
}

const MultiStepProgressIndicator: React.FC<MultiStepProgressIndicatorProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
  className,
}) => {
  console.log("Rendering MultiStepProgressIndicator, current step index:", currentStepIndex);

  return (
    <nav aria-label="Progress" className={cn("flex items-center justify-center space-x-2 sm:space-x-4", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        // const isUpcoming = index > currentStepIndex; // Not used in this basic version

        return (
          <React.Fragment key={step.id}>
            <button
              type="button"
              onClick={onStepClick ? () => onStepClick(index) : undefined}
              disabled={!onStepClick}
              className={cn(
                "flex flex-col items-center text-center",
                onStepClick ? "cursor-pointer" : "cursor-default"
              )}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <div
                className={cn(
                  "w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-colors",
                  isCompleted ? "bg-green-600 text-white" :
                  isCurrent ? "bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2" :
                  "bg-gray-200 text-gray-600 group-hover:bg-gray-300"
                )}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className={cn(
                "mt-1.5 text-xs sm:text-sm font-medium",
                isCurrent ? "text-blue-600" : "text-gray-500",
                isCompleted && "text-green-700"
              )}>
                {step.name}
              </span>
            </button>

            {index < steps.length - 1 && (
              <div
                aria-hidden="true"
                className={cn(
                  "flex-1 h-0.5",
                  index < currentStepIndex ? "bg-green-600" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default MultiStepProgressIndicator;