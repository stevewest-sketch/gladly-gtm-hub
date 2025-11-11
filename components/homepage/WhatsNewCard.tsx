'use client';

interface WhatsNewCardProps {
  date: string;
  emoji: string;
  title: string;
  description: string;
  links?: Array<{
    text: string;
    url: string;
  }>;
}

export default function WhatsNewCard({
  date,
  emoji,
  title,
  description,
  links,
}: WhatsNewCardProps) {
  return (
    <div className="update-item">
      <div className="update-date">{date}</div>
      <div className="update-title">
        <span>{emoji}</span> {title}
      </div>
      <div className="update-description">{description}</div>
      {links && links.length > 0 && (
        <div className="update-links">
          {links.map((link, index) => (
            <a key={index} href={link.url} className="update-link">
              → {link.text}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        .update-item {
          padding: 20px 0;
          border-bottom: 1px solid #eee;
        }

        .update-item:last-child {
          border-bottom: none;
        }

        .update-date {
          font-size: 13px;
          color: #888;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .update-title {
          font-size: 18px;
          color: #1a1a1a;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .update-title span {
          margin-right: 8px;
        }

        .update-description {
          font-size: 15px;
          color: #666;
          margin-bottom: 12px;
        }

        .update-links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .update-link {
          color: #3B82F6;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .update-link:hover {
          color: #1E40AF;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
