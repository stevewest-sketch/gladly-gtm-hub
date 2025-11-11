'use client';

interface QuickTaskCardProps {
  emoji: string;
  title: string;
  link: string;
}

export default function QuickTaskCard({
  emoji,
  title,
  link,
}: QuickTaskCardProps) {
  return (
    <a href={link} className="task-card">
      <span className="text-[32px] flex-shrink-0">{emoji}</span>
      <div>
        <h4 className="text-base font-semibold text-[#1a1a1a]">{title}</h4>
      </div>

      <style jsx>{`
        .task-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border-left: 3px solid #3B82F6;
          border-top: 1px solid #F3F3F3;
          border-right: 1px solid #F3F3F3;
          border-bottom: 1px solid #F3F3F3;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .task-card:hover {
          background: #DBEAFE;
          border-left-color: #3B82F6;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </a>
  );
}
