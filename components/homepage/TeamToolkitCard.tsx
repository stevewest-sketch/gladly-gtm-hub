'use client';

interface TeamToolkitCardProps {
  emoji: string;
  title: string;
  description: string;
  link: string;
  color: 'blue' | 'purple' | 'green' | 'orange';
}

export default function TeamToolkitCard({
  emoji,
  title,
  description,
  link,
  color,
}: TeamToolkitCardProps) {
  const colorClass =
    color === 'blue' ? 'sales' :
    color === 'purple' ? 'csm' :
    color === 'green' ? 'sc' :
    'marketing';

  return (
    <a
      href={link}
      className={`toolkit-card ${colorClass}`}
    >
      <span className="text-5xl mb-4 block">{emoji}</span>
      <h3 className="text-[22px] font-semibold text-[#1a1a1a] mb-2">{title}</h3>
      <p className="text-sm text-[#666] leading-tight">{description}</p>

      <style jsx>{`
        .toolkit-card {
          background: white;
          border: 2px solid #F3F3F3;
          border-radius: 12px;
          padding: 32px 24px;
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
          display: block;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .toolkit-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          transition: all 0.3s ease;
        }

        .toolkit-card.sales::before {
          background: #3B82F6;
        }

        .toolkit-card.csm::before {
          background: #8C69F0;
        }

        .toolkit-card.sc::before {
          background: #F97316;
        }

        .toolkit-card.marketing::before {
          background: #8C69F0;
        }

        .toolkit-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          background: #E8E0F8;
          border-color: #8C69F0;
        }

        .toolkit-card:hover::before {
          height: 100%;
          opacity: 0.1;
        }
      `}</style>
    </a>
  );
}
