'use client';

interface ProductCardProps {
  emoji: string;
  title: string;
  link: string;
}

export default function ProductCard({
  emoji,
  title,
  link,
}: ProductCardProps) {
  return (
    <a href={link} className="product-card">
      <span className="text-4xl mb-3 block">{emoji}</span>
      <h4 className="text-[15px] font-semibold text-[#1a1a1a]">{title}</h4>

      <style jsx>{`
        .product-card {
          background: white;
          padding: 24px 20px;
          border-radius: 8px;
          border: 2px solid #F3F3F3;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          text-align: center;
          display: block;
        }

        .product-card:hover {
          background: #E8E0F8;
          border-color: #8C69F0;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </a>
  );
}
