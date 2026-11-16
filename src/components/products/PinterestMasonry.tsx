'use client';

import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface PinterestMasonryProps {
  products: Product[];
  emptyMessage?: string;
}

export function PinterestMasonry({
  products,
  emptyMessage = 'No products match your current selection.',
}: PinterestMasonryProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center bg-white/50 rounded-2xl border border-nhk-beige p-8">
        <p className="text-base font-medium text-nhk-charcoal">{emptyMessage}</p>
        <p className="text-xs text-nhk-grey mt-1">Try resetting your filters or search keywords.</p>
      </div>
    );
  }

  return (
    <div className="masonry-grid">
      {products.map((product, idx) => (
        <div key={product.id} className="masonry-item">
          <ProductCard
            product={product}
            priority={idx < 4}
            aspect={idx % 3 === 0 ? 'vertical' : idx % 2 === 0 ? 'tall' : 'square'}
          />
        </div>
      ))}
    </div>
  );
}
