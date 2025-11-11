interface Feature {
  icon?: string;
  title: string;
  description?: string;
  link?: string;
}

interface FeatureGridSectionProps {
  anchorId?: string;
  sectionTitle?: string;
  sectionDescription?: string;
  features: Feature[];
  columns?: number;
  backgroundColor?: string;
  variant?: 'default' | 'bordered' | 'card';
}

export default function FeatureGridSection({
  anchorId,
  sectionTitle,
  sectionDescription,
  features,
  columns = 3,
  backgroundColor = 'white',
  variant = 'default',
}: FeatureGridSectionProps) {
  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  // Match original HTML styling for gray backgrounds
  const isGrayBg = backgroundColor === 'gray';
  const containerClass = isGrayBg
    ? 'bg-[#F3F3F3] py-[50px] px-10 -mx-10 mb-[50px]'
    : 'mb-[50px]';

  // Variant styling
  const isBordered = variant === 'bordered';
  const isCard = variant === 'card';

  return (
    <div id={anchorId} className={containerClass}>
      <div className="max-w-[1200px] mx-auto">
        {(sectionTitle || sectionDescription) && (
          <div className="mb-6">
            {sectionTitle && (
              <h2 className="text-[26px] font-semibold text-[#1a1a1a] mb-3">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="text-[14px] text-[#666666]">
                {sectionDescription}
              </p>
            )}
          </div>
        )}

        <div className={`grid ${gridClass} gap-${isBordered ? '4' : '6'}`}>
          {features.map((feature, index) => {
            const cardClass = isBordered
              ? 'bg-white border-l-[3px] border-[#8C69F0] p-5 rounded hover:bg-[#E8E0F8] transition-all duration-300'
              : isCard
              ? 'bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:bg-[#E8E0F8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer block no-underline'
              : 'bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:bg-[#E8E0F8] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-center block no-underline';

            const content = (
              <>
                {feature.icon && (
                  <div className={`text-[32px] mb-3 ${isCard ? '' : 'text-center'}`}>{feature.icon}</div>
                )}
                <h4 className={`${isBordered ? 'text-[16px]' : 'text-[16px]'} font-semibold text-[#0D0D0D] mb-2`}>
                  {feature.title}
                </h4>
                {feature.description && (
                  <p className={`text-[13px] text-[#666666] ${isBordered ? 'm-0' : 'leading-relaxed'}`}>
                    {feature.description}
                  </p>
                )}
                {(isCard || feature.link) && (
                  <span className="text-[#8C69F0] text-sm font-semibold mt-4 block">
                    {feature.title.includes('One-Pager') || feature.title.includes('one-pager') ? 'View One-Pager →' :
                     feature.title.includes('Deck') ? 'View Deck →' :
                     feature.title.includes('Case') || feature.title.includes('Stories') || feature.title.includes('stories') ? 'View Stories →' :
                     feature.title.includes('Environment') || feature.title.includes('Demo') || feature.title.includes('demo') ? 'Watch Demo →' :
                     feature.title.includes('Script') ? 'View Mockups →' :
                     feature.title.includes('Video') || feature.title.includes('video') ? 'Watch Video →' :
                     feature.title.includes('Calculator') ? 'Use Calculator →' :
                     feature.title.includes('Battle') ? 'View Battle Cards →' :
                     feature.title.includes('Migration') ? 'Read Stories →' :
                     feature.title.includes('Training') || feature.title.includes('Enablement') ? 'Start Training →' :
                     feature.title.includes('Guide') || feature.title.includes('guide') ? 'View Guide →' :
                     feature.title.includes('Tracker') || feature.title.includes('Report') ? 'View Report →' :
                     feature.title.includes('Article') || feature.title.includes('article') ? 'Read Article →' :
                     feature.title.includes('FAQ') ? 'View FAQ →' :
                     feature.title.includes('Slides') || feature.title.includes('Presentation') ? 'View Slides →' :
                     feature.title.includes('Roadmap') ? 'View Roadmap →' :
                     feature.title.includes('Folder') || feature.title.includes('Materials') || feature.title.includes('assets') || feature.title.includes('Assets') ? 'Access Materials →' :
                     feature.title.includes('Talk Track') ? 'View Talk Tracks →' :
                     feature.title.includes('Template') ? 'View Templates →' :
                     feature.title.includes('List') || feature.title.includes('apps') ? 'View Apps →' :
                     feature.title.includes('Photo') ? 'View Photos →' :
                     feature.title.includes('Session') || feature.title.includes('Recording') ? 'Watch Recording →' :
                     'Learn More →'}
                  </span>
                )}
              </>
            );

            return feature.link ? (
              <a key={index} href={feature.link} className={cardClass}>
                {content}
              </a>
            ) : (
              <div key={index} className={cardClass}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
