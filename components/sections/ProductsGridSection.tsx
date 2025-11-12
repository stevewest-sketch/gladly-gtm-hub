import ProductCard from '../homepage/ProductCard';
import { GradientDivider } from '@/components/ui';

interface Product {
  emoji: string;
  title: string;
  link: string;
}

interface ProductsGridSectionProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  products: Product[];
}

export default function ProductsGridSection({
  sectionTitle = 'Product Knowledge',
  sectionSubtitle = 'Learn about our products and features',
  products,
}: ProductsGridSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <>
      <GradientDivider gradient="purple" />

      <div className="mb-[50px]">
        <h2 className="text-[26px] font-semibold text-[#1a1a1a] mb-3">
          {sectionTitle}
        </h2>
        <p className="text-[14px] text-[#666666] mb-8">{sectionSubtitle}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              emoji={product.emoji}
              title={product.title}
              link={product.link}
            />
          ))}
        </div>
      </div>
    </>
  );
}
