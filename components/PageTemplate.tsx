'use client';

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  heroColor?: string;
  children: React.ReactNode;
}

export default function PageTemplate({ title, subtitle, heroColor = 'purple', children }: PageTemplateProps) {
  const gradients = {
    purple: 'linear-gradient(135deg, #8C69F0 0%, #7557d9 100%)',
    blue: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
    green: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    orange: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-10 py-12">
        {/* Hero */}
        <div
          className="rounded-xl p-16 mb-10 text-center text-white"
          style={{ background: gradients[heroColor as keyof typeof gradients] || gradients.purple }}
        >
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-xl opacity-95 max-w-3xl mx-auto">{subtitle}</p>}
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          {children}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <a href="/" className="text-blue-600 hover:text-blue-800 font-semibold">
            ← Back to GTM Hub
          </a>
        </div>
      </div>
    </div>
  );
}
