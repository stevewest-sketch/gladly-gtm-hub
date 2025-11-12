'use client';

import { Button } from '@/components/ui';
import { gradients } from '@/lib/theme';

interface HelpSectionProps {
  title: string;
  description: string;
  buttons?: Array<{
    text: string;
    link: string;
    variant: 'primary' | 'secondary';
  }>;
}

export default function HelpSection({
  title,
  description,
  buttons,
}: HelpSectionProps) {
  return (
    <div
      className="rounded-xl p-8 text-center"
      style={{ background: gradients.blue }}
    >
      <h3 className="text-xl text-white mb-3 font-semibold">
        {title}
      </h3>
      <p className="text-base text-white mb-5">
        {description}
      </p>
      {buttons && buttons.length > 0 && (
        <div className="flex gap-4 justify-center flex-wrap">
          {buttons.map((button, index) => (
            <Button
              key={index}
              href={button.link}
              variant={button.variant === 'secondary' ? 'ghost' : 'ghost'}
              className={button.variant === 'secondary'
                ? 'bg-transparent border-2 border-white text-white hover:bg-white/10'
                : 'bg-white text-primary-blue-dark hover:bg-white/90'
              }
            >
              {button.text}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
