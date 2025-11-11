interface LaunchStatusSectionProps {
  heading: string;
  statusItems: Array<{
    label: string;
    isActive: boolean;
  }>;
  description?: string;
}

export default function LaunchStatusSection({
  heading,
  statusItems,
  description,
}: LaunchStatusSectionProps) {
  return (
    <div className="bg-[#C5B3F8] p-8 rounded-lg mt-10 border border-white/20">
      <h3 className="text-2xl font-bold mb-5 text-[#0D0D0D]">{heading}</h3>

      {/* Status Grid - 4 columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
        {statusItems.map((item, index) => (
          <div
            key={index}
            className={`p-2.5 rounded text-center text-sm ${
              item.isActive
                ? 'bg-[#8C69F0] text-white font-bold'
                : 'bg-[#9B8AC7] text-white'
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>

      {description && (
        <p className="mt-5 text-sm text-[#0D0D0D]">{description}</p>
      )}
    </div>
  );
}
