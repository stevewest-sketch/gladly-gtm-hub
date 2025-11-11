'use client';

interface Resource {
  label: string;
  url: string;
  type: 'doc' | 'video' | 'tool' | 'link';
}

interface CoEResourcesPanelProps {
  resources: Resource[];
  quizUrl?: string;
}

const resourceIcons = {
  doc: '📄',
  video: '🎥',
  tool: '🔧',
  link: '🔗',
};

export default function CoEResourcesPanel({ resources, quizUrl }: CoEResourcesPanelProps) {
  return (
    <div className="space-y-6">
      {/* Quiz Section */}
      {quizUrl && (
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span>📝</span> Knowledge Check
          </h4>
          <p className="text-sm mb-4 opacity-90">
            Test your understanding of this optimization guide
          </p>
          <a
            href={quizUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full bg-white text-blue-600 text-center py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Take Quiz →
          </a>
        </div>
      )}

      {/* Resources Section */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
        <h4 className="text-lg font-bold mb-4 text-[#0D0D0D] flex items-center gap-2">
          <span>📚</span> Resources
        </h4>
        <div className="space-y-2">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-white border-2 border-transparent hover:border-[#8C69F0] rounded-lg transition-all group"
            >
              <span className="text-xl">{resourceIcons[resource.type]}</span>
              <span className="flex-1 text-sm font-medium text-[#0D0D0D] group-hover:text-[#8C69F0]">
                {resource.label}
              </span>
              <span className="text-[#8C69F0] opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold">
                Open →
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
        <h4 className="text-lg font-bold mb-3 text-[#0D0D0D] flex items-center gap-2">
          <span>💬</span> Need Help?
        </h4>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Questions about optimization strategies? Reach out to the CoE team.
        </p>
        <a
          href="https://gladly.slack.com/archives/coe"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-[#8C69F0] hover:underline font-medium"
        >
          #coe on Slack →
        </a>
      </div>
    </div>
  );
}
