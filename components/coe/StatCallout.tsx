interface StatCalloutProps {
  metric: string;
  label: string;
  context?: string;
  variant?: 'primary' | 'success' | 'warning' | 'info';
}

const variantStyles = {
  primary: {
    bg: 'bg-gradient-to-br from-primary-purple to-primary-purple-dark',
    text: 'text-white',
    border: 'border-primary-purple',
  },
  success: {
    bg: 'bg-gradient-to-br from-emerald-600 to-emerald-700',
    text: 'text-white',
    border: 'border-emerald-600',
  },
  warning: {
    bg: 'bg-gradient-to-br from-gray-700 to-gray-800',
    text: 'text-white',
    border: 'border-gray-700',
  },
  info: {
    bg: 'bg-gradient-to-br from-blue-600 to-blue-700',
    text: 'text-white',
    border: 'border-blue-600',
  },
};

export default function StatCallout({
  metric,
  label,
  context,
  variant = 'primary'
}: StatCalloutProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`${styles.bg} ${styles.text} rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}>
      <div className="text-center">
        <div className="text-5xl font-bold mb-3 tracking-tight">
          {metric}
        </div>
        <div className="text-lg font-semibold mb-2 opacity-95">
          {label}
        </div>
        {context && (
          <div className="text-sm opacity-80 leading-relaxed">
            {context}
          </div>
        )}
      </div>
    </div>
  );
}
