'use client';

interface HeroWithSearchSectionProps {
  heroTitle: string;
  heroSubtitle?: string;
  searchPlaceholder?: string;
  paddingTop?: string;
}

const paddingClasses = {
  none: 'pt-0',
  small: 'pt-10',
  medium: 'pt-20',
  large: 'pt-30',
  xlarge: 'pt-40',
};

export default function HeroWithSearchSection({
  heroTitle,
  heroSubtitle,
  searchPlaceholder = 'Search for battle cards, templates, demos, product info...',
  paddingTop = 'medium',
}: HeroWithSearchSectionProps) {
  const paddingClass = paddingClasses[paddingTop as keyof typeof paddingClasses] || paddingClasses.medium;

  return (
    <div
      className={`${paddingClass} py-[50px]`}
      style={{background: 'linear-gradient(135deg, #6B46C1 0%, #8C69F0 50%, #A78BFA 100%)'}}
    >
      {/* Header */}
      <div className="text-center mb-12 max-w-[1200px] mx-auto px-10">
        <h1 className="text-[48px] text-white mb-4 font-bold tracking-tight">
          {heroTitle}
        </h1>
        {heroSubtitle && (
          <p className="text-[18px] text-white">{heroSubtitle}</p>
        )}
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="max-w-3xl mx-auto relative px-10">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-full px-6 py-4 text-base border-2 border-[#F3F3F3] rounded-full transition-all bg-white shadow-sm focus:outline-none focus:border-[#8C69F0] focus:shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
