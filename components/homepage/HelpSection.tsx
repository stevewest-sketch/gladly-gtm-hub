'use client';

interface HelpSectionProps {
  title: string;
  description: string;
  buttons?: Array<{
    text: string;
    link: string;
    variant: 'primary' | 'secondary';
  }>;
}

export default function HelpSection({
  title,
  description,
  buttons,
}: HelpSectionProps) {
  return (
    <div className="help-section">
      <h3>{title}</h3>
      <p>{description}</p>
      {buttons && buttons.length > 0 && (
        <div className="help-actions">
          {buttons.map((button, index) => (
            <a
              key={index}
              href={button.link}
              className={`help-button ${button.variant === 'secondary' ? 'secondary' : ''}`}
            >
              {button.text}
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        .help-section {
          background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%);
          border-radius: 12px;
          padding: 32px;
          text-align: center;
        }

        .help-section h3 {
          font-size: 20px;
          color: #FFFFFF;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .help-section p {
          font-size: 15px;
          color: #FFFFFF;
          margin-bottom: 20px;
        }

        .help-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .help-button {
          background: white;
          color: #1E40AF;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .help-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .help-button.secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .help-button.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
