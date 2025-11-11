import { PortableText } from '@portabletext/react';

interface ExampleCardProps {
  title: string;
  content: any[];
  index: number;
}

// Helper to parse and render text with special callouts
const renderContentBlock = (block: any, blockIndex: number) => {
  if (!block.children || !block.children[0] || !block.children[0].text) {
    return null;
  }

  const text = block.children[0].text;

  // Check for Primary KPI
  if (text.includes('Primary KPI:')) {
    const parts = text.split('Primary KPI:');
    return (
      <div key={blockIndex} className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <span className="text-blue-600 font-bold text-sm uppercase tracking-wide whitespace-nowrap">📊 Primary KPI:</span>
          <p className="text-base text-gray-700 leading-relaxed">{parts[1]?.trim()}</p>
        </div>
      </div>
    );
  }

  // Check for Key to success
  if (text.includes('Key to success:')) {
    const parts = text.split('Key to success:');
    return (
      <div key={blockIndex} className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-4 mb-4">
        <div className="flex items-start gap-3">
          <span className="text-green-600 font-bold text-sm uppercase tracking-wide whitespace-nowrap">✅ Key to Success:</span>
          <p className="text-base text-gray-700 leading-relaxed">{parts[1]?.trim()}</p>
        </div>
      </div>
    );
  }

  // Regular paragraph
  return (
    <p key={blockIndex} className="mb-4 text-base leading-relaxed text-gray-700 last:mb-0">
      {text}
    </p>
  );
};

export default function ExampleCard({ title, content, index }: ExampleCardProps) {
  return (
    <div className="bg-white border-2 border-[#E5E7EB] rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-md transition-all">
      {/* Header */}
      <div className="bg-gray-50 border-b-2 border-[#E5E7EB] p-6">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-[#0D0D0D] rounded-lg flex items-center justify-center text-white font-bold text-lg">
            {index + 1}
          </div>
          <h3 className="text-xl font-bold text-[#0D0D0D]">{title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="space-y-2">
          {content.map((block, blockIndex) => renderContentBlock(block, blockIndex))}
        </div>
      </div>
    </div>
  );
}
