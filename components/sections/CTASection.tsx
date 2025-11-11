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

const bgColorMap: Record<string, { useGradient: boolean; value: string }> = {
  purple: { useGradient: true, value: 'linear-gradient(135deg, #8C69F0 0%, #6B46C1 100%)' },
  blue: { useGradient: true, value: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)' },
  orange: { useGradient: true, value: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' },
  dark: { useGradient: false, value: 'bg-[#0D0D0D]' },
};

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
  const bgConfig = bgColorMap[backgroundColor] || bgColorMap.purple;

  return (
    <div
      id={anchorId}
      className={`py-[50px] px-10 rounded-lg mt-[50px] ${!bgConfig.useGradient ? bgConfig.value : ''}`}
      style={bgConfig.useGradient ? {background: bgConfig.value} : undefined}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-[26px] font-semibold text-white mb-4">{heading}</h2>
        {description && (
          <p className="text-[16px] text-white mb-7">{description}</p>
        )}
        <div className="flex gap-4 justify-center flex-wrap">
          {primaryButtonText && primaryButtonLink && (
            <a
              href={primaryButtonLink}
              className="inline-block bg-white text-[#8C69F0] px-8 py-3.5 rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              {primaryButtonText}
            </a>
          )}
          {secondaryButtonText && secondaryButtonLink && (
            <a
              href={secondaryButtonLink}
              className="inline-block bg-transparent text-white px-8 py-3.5 rounded-lg font-semibold border-2 border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              {secondaryButtonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
