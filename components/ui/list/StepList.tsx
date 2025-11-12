import { ReactNode } from 'react';

export interface StepItem {
  title: string;
  description?: string | ReactNode;
  icon?: string;
}

export interface StepListProps {
  steps: StepItem[];
  variant?: 'purple' | 'blue' | 'green';
  numbered?: boolean;
  className?: string;
}

/**
 * StepList - Display a list of steps or bullet points
 * Supports numbered or icon-based steps with different color variants
 */
export function StepList({
  steps,
  variant = 'purple',
  numbered = false,
  className = '',
}: StepListProps) {
  const variantColors = {
    purple: 'bg-primary-purple text-white',
    blue: 'bg-primary-blue text-white',
    green: 'bg-primary-green text-white',
  };

  const bulletColors = {
    purple: 'bg-primary-purple',
    blue: 'bg-primary-blue',
    green: 'bg-primary-green',
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {steps.map((step, index) => (
        <div key={index} className="flex gap-4 items-start">
          {numbered ? (
            <div
              className={`flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 ${variantColors[variant]} rounded-full flex items-center justify-center font-bold text-sm lg:text-base`}
            >
              {step.icon || index + 1}
            </div>
          ) : (
            <div className={`w-1.5 h-1.5 mt-2 ${bulletColors[variant]} rounded-full flex-shrink-0`} />
          )}
          <div className="flex-1">
            <h4 className="font-semibold text-neutral-black mb-1">{step.title}</h4>
            {step.description && (
              <div className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
