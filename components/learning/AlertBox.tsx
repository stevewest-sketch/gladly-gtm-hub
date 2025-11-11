interface AlertBoxProps {
  type: 'info' | 'warning' | 'success' | 'danger';
  title?: string;
  children: React.ReactNode;
}

const typeStyles = {
  info: {
    bg: 'bg-[#DBEAFE]',
    border: 'border-[#3B82F6]',
  },
  warning: {
    bg: 'bg-[#FEF3C7]',
    border: 'border-[#F59E0B]',
  },
  success: {
    bg: 'bg-[#D1FAE5]',
    border: 'border-[#10B981]',
  },
  danger: {
    bg: 'bg-[#FEF3C7]',
    border: 'border-[#F59E0B]',
  },
};

export default function AlertBox({ type, title, children }: AlertBoxProps) {
  const styles = typeStyles[type];

  return (
    <div className={`${styles.bg} border-l-4 ${styles.border} rounded-lg p-6 my-6`}>
      {title && (
        <h4 className="text-lg font-bold mb-3 text-[#0D0D0D]">{title}</h4>
      )}
      <div className="text-[#0D0D0D] leading-relaxed">{children}</div>
    </div>
  );
}
