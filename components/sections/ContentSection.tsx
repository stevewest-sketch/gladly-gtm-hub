import PortableTextContent from '../PortableTextContent';
import LaunchStatusSection from './LaunchStatusSection';

interface ContentSectionProps {
  anchorId?: string;
  sectionTitle?: string;
  content: any[];
  backgroundColor?: string;
  includeLaunchStatus?: boolean;
  launchStatus?: {
    heading: string;
    statusItems: Array<{
      label: string;
      isActive: boolean;
    }>;
    description?: string;
  };
}

export default function ContentSection({
  anchorId,
  sectionTitle,
  content,
  backgroundColor = 'white',
  includeLaunchStatus,
  launchStatus,
}: ContentSectionProps) {
  const isDark = backgroundColor === 'dark';
  const isGray = backgroundColor === 'gray';

  // Match original HTML styling exactly
  const bgClass = isDark
    ? 'bg-[#0D0D0D] py-[60px] px-10 mb-0'
    : isGray
    ? 'bg-[#F3F3F3] py-[50px] px-10 -mx-10 mb-[50px]'
    : 'mb-[50px]';

  const textClass = isDark ? 'text-white' : 'text-gray-900';

  // For dark sections, they should be full-width without container nesting
  if (isDark) {
    return (
      <div id={anchorId} className={bgClass}>
        <div className="max-w-[1200px] mx-auto">
          {sectionTitle && (
            <h2 className="text-[32px] font-bold text-white mb-6">
              {sectionTitle}
            </h2>
          )}
          <div className="prose prose-invert max-w-none text-[18px] text-white">
            <PortableTextContent content={content} />
          </div>

          {/* Render Launch Status inside this section if included */}
          {includeLaunchStatus && launchStatus && (
            <div className="mt-10">
              <LaunchStatusSection {...launchStatus} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div id={anchorId} className={bgClass}>
      <div className="max-w-[1200px] mx-auto">
        {sectionTitle && (
          <h2 className="text-[32px] font-bold text-[#0D0D0D] mb-6">
            {sectionTitle}
          </h2>
        )}
        <div className="prose max-w-none text-[#0D0D0D]">
          <PortableTextContent content={content} />
        </div>

        {/* Render Launch Status inside this section if included */}
        {includeLaunchStatus && launchStatus && (
          <div className="mt-10">
            <LaunchStatusSection {...launchStatus} />
          </div>
        )}
      </div>
    </div>
  );
}
