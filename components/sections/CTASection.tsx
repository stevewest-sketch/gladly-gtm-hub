import { Button } from '@/components/ui';
import { gradients, type GradientType } from '@/lib/theme';

interface CTASectionProps {
  anchorId?: string;
  heading: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundColor?: string;
}

export default function CTASection({
  anchorId,
  heading,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  backgroundColor = 'purple',
}: CTASectionProps) {
  const isDark = backgroundColor === 'dark';
  const gradientKey = (backgroundColor === 'dark' ? 'purple' : backgroundColor) as GradientType;

  return (
    <div
      id={anchorId}
      className={`py-[50px] px-10 rounded-lg mt-[50px] ${isDark ? 'bg-[#0D0D0D]' : ''}`}
      style={!isDark ? { background: gradients[gradientKey] } : undefined}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-[26px] font-semibold text-white mb-4">{heading}</h2>
        {description && (
          <p className="text-[16px] text-white mb-7">{description}</p>
        )}
        <div className="flex gap-4 justify-center flex-wrap">
          {primaryButtonText && primaryButtonLink && (
            <Button
              href={primaryButtonLink}
              variant="ghost"
              size="lg"
              className="bg-white text-[#8C69F0]"
            >
              {primaryButtonText}
            </Button>
          )}
          {secondaryButtonText && secondaryButtonLink && (
            <Button
              href={secondaryButtonLink}
              variant="ghost"
              size="lg"
              className="bg-transparent text-white border-2 border-white hover:bg-white/10"
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
