interface Metric {
  value: string;
  label: string;
}

interface CaseStudyCardProps {
  company: string;
  challenge: string;
  approach: string[];
  metrics: Metric[];
  keyTakeaway: string;
  variant?: 'primary' | 'secondary';
}

export default function CaseStudyCard({
  company,
  challenge,
  approach,
  metrics,
  keyTakeaway,
  variant = 'primary'
}: CaseStudyCardProps) {
  const accentColor = variant === 'primary' ? 'border-primary-purple' : 'border-blue-600';
  const accentBg = variant === 'primary' ? 'bg-primary-purple' : 'bg-blue-600';

  return (
    <div className={`bg-white border-2 ${accentColor} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all`}>
      {/* Compact Header */}
      <div className={`${accentBg} text-white px-6 py-4`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏆</span>
          <h3 className="text-xl font-bold">{company}</h3>
          <span className="text-xs opacity-75 ml-auto">Customer Success Story</span>
        </div>
      </div>

      {/* Content - Horizontal Layout */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-5">
          {/* Left Column: Challenge & Approach */}
          <div className="space-y-4">
            {/* Challenge */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                The Challenge
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {challenge}
              </p>
            </div>

            {/* Approach */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                The Approach
              </h4>
              <ul className="space-y-1.5">
                {approach.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary-purple font-bold text-xs mt-0.5">•</span>
                    <span className="text-sm text-gray-700 leading-snug flex-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Metrics */}
          <div>
            <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-4 h-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📊</span>
                <span className="text-blue-700 font-bold text-xs uppercase tracking-wide">
                  Primary KPIs
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {metrics.map((metric, index) => (
                  <div key={index}>
                    <div className={`text-2xl font-bold ${variant === 'primary' ? 'text-primary-purple' : 'text-blue-600'} leading-none mb-1`}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-gray-600 font-medium leading-tight">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Takeaway - Full Width */}
        <div className="bg-emerald-50 border-2 border-emerald-600 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <span className="text-xl flex-shrink-0 mt-0.5">✅</span>
            <div className="flex-1">
              <span className="text-emerald-700 font-bold text-xs uppercase tracking-wide block mb-1">
                Key to Success
              </span>
              <p className="text-sm text-gray-700 leading-relaxed">
                {keyTakeaway}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
