interface Stat {
  number: string;
  label: string;
  description?: string;
}

interface StatsSectionProps {
  anchorId?: string;
  stats: Stat[];
  backgroundColor?: string;
}

const bgColorMap: Record<string, string> = {
  white: 'bg-white',
  gray: 'bg-[#f8f9fa]',
  purple: 'bg-[#8C69F0] text-white',
  dark: 'bg-[#0D0D0D] text-white',
};

export default function StatsSection({
  anchorId,
  stats,
  backgroundColor = 'gray',
}: StatsSectionProps) {
  const bgClass = bgColorMap[backgroundColor] || bgColorMap.gray;
  const isDark = backgroundColor === 'purple' || backgroundColor === 'dark';

  return (
    <div id={anchorId} className={`${bgClass} py-12 px-5 rounded-xl my-8`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#8C69F0]'}`}>
              {stat.number}
            </div>
            <div className={`text-sm font-semibold uppercase tracking-wide mb-1 ${isDark ? 'text-white opacity-90' : 'text-gray-900'}`}>
              {stat.label}
            </div>
            {stat.description && (
              <div className={`text-xs ${isDark ? 'text-white opacity-75' : 'text-gray-600'}`}>
                {stat.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
