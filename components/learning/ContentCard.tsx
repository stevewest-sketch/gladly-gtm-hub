interface ContentCardProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
}

export default function ContentCard({ title, icon, children }: ContentCardProps) {
  return (
    <div className="bg-white border-2 border-[#F3F3F3] rounded-lg p-6 hover:border-[#8C69F0] hover:shadow-lg hover:-translate-y-1 transition-all">
      {icon && <div className="text-3xl mb-3">{icon}</div>}
      <h4 className="text-lg font-bold mb-3 text-[#8C69F0]">{title}</h4>
      <div className="text-[#0D0D0D] text-sm leading-relaxed">{children}</div>
    </div>
  );
}
