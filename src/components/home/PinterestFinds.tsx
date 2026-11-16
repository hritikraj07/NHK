'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PinterestMasonry } from '@/components/products/PinterestMasonry';
import { useProducts } from '@/hooks/useProducts';

export function PinterestFinds() {
  const { products } = useProducts();
  const pinterestItems = products.filter((p) => p.isPinterestFind).slice(0, 8);

  return (
    <section className="py-24 bg-[#EDE8DF]/30 border-y border-nhk-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Pinterest Visual Identity */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-red-600 text-xs font-semibold">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.48.03-3.55.15-.97 1-4.22 1-4.22s-.25-.52-.25-1.28c0-1.2.7-2.1 1.57-2.1.74 0 1.1.56 1.1 1.23 0 .75-.48 1.86-.72 2.9-.2.87.43 1.58 1.3 1.58 1.56 0 2.76-1.64 2.76-4.02 0-2.1-1.5-3.57-3.66-3.57-2.5 0-3.96 1.87-3.96 3.8 0 .75.29 1.56.65 2 .07.09.08.17.06.26l-.24 1c-.04.16-.14.2-.32.11-1.18-.55-1.92-2.28-1.92-3.66 0-2.98 2.16-5.72 6.25-5.72 3.28 0 5.83 2.34 5.83 5.46 0 3.26-2.05 5.88-4.9 5.88-.96 0-1.86-.5-2.17-1.09l-.59 2.25c-.21.83-.8 1.86-1.19 2.51A12.02 12.02 0 1 0 12 0z" />
              </svg>
              <span>Pinterest Community Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-nhk-charcoal">
              Visual Finds & Viral Pins
            </h2>
            <p className="text-sm text-nhk-grey max-w-xl">
              The aesthetic, high-utility objects circulating across mood boards and aesthetic feeds. Hover any image to pin directly to your personal boards.
            </p>
          </div>

          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-nhk-grey-border text-xs font-semibold uppercase tracking-wider text-nhk-charcoal hover:bg-nhk-beige hover:border-nhk-charcoal transition-all self-start md:self-auto shadow-sm"
          >
            <span>Follow NHK on Pinterest</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-red-600" />
          </a>
        </div>

        {/* Pinterest True Masonry Grid */}
        <PinterestMasonry products={pinterestItems} />
      </div>
    </section>
  );
}
