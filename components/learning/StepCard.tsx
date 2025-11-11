interface StepCardProps {
  stepNumber: number;
  title: string;
  children: React.ReactNode;
}

export default function StepCard({ stepNumber, title, children }: StepCardProps) {
  return (
    <div className="bg-white border-2 border-[#F3F3F3] border-l-4 border-l-[#8C69F0] rounded-lg p-6 mb-6">
      <div className="flex items-start gap-3 mb-3">
        <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 bg-[#8C69F0] text-white rounded-full font-bold text-sm">
          {stepNumber}
        </span>
        <h4 className="text-lg font-bold text-[#0D0D0D] pt-1">{title}</h4>
      </div>
      <div className="ml-11 text-[#0D0D0D] leading-relaxed">{children}</div>
    </div>
  );
}
