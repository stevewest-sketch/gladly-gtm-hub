'use client';

interface Resource {
  label: string;
  url: string;
  type: 'doc' | 'video' | 'tool' | 'link';
}

interface ResourcesPanelProps {
  resources: Resource[];
  quizUrl?: string;
}

const resourceIcons = {
  doc: '📄',
  video: '🎥',
  tool: '🔧',
  link: '🔗',
};

export default function ResourcesPanel({ resources, quizUrl }: ResourcesPanelProps) {
  return (
    <div className="space-y-6">
      {/* Quiz Section */}
      {quizUrl && (
        <div className="bg-gradient-to-br from-[#8C69F0] to-[#7557d9] rounded-lg p-6 text-white">
          <h4 className="text-lg font-bold mb-3">📝 Knowledge Check</h4>
          <p className="text-sm mb-4 opacity-90">
            Test your understanding of this module
          </p>
          <a
            href={quizUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full bg-white text-[#8C69F0] text-center py-3 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Take Quiz →
          </a>
        </div>
      )}

      {/* Resources Section */}
      <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6">
        <h4 className="text-lg font-bold mb-4 text-[#0D0D0D]">Resources</h4>
        <div className="space-y-2">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-[#F3F3F3] hover:bg-white border-2 border-transparent hover:border-[#8C69F0] rounded-lg transition-all group"
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
      <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6">
        <h4 className="text-lg font-bold mb-3 text-[#0D0D0D]">Need Help?</h4>
        <p className="text-sm text-gray-600 mb-4">
          Questions about this training? Reach out to the enablement team.
        </p>
        <a
          href="https://gladly.slack.com/archives/enablement"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm text-[#8C69F0] hover:underline font-medium"
        >
          #enablement on Slack →
        </a>
      </div>
    </div>
  );
}
