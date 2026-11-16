'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { useProducts } from '@/hooks/useProducts';

const FILTER_TABS = [
  { id: 'all', label: 'All Finds' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'tech', label: 'Tech' },
  { id: 'home', label: 'Home' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'essentials', label: 'Essentials' },
];

export function FeaturedGrid() {
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState('all');

  const filtered = products
    .filter((p) => p.isFeatured || p.isEditorsPick)
    .filter((p) => (activeTab === 'all' ? true : p.category === activeTab))
    .slice(0, 6);

  return (
    <section className="py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-nhk-accent mb-2">
              <span>Verified Selections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-nhk-charcoal">
              Featured Discoveries
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-nhk-charcoal text-white shadow-sm'
                    : 'bg-white border border-nhk-grey-border text-nhk-grey hover:text-nhk-charcoal hover:bg-nhk-beige'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={idx < 3}
              aspect="tall"
            />
          ))}
        </div>

        {/* Bottom CTA to Explore */}
        <div className="mt-16 text-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-nhk-beige hover:bg-nhk-charcoal text-nhk-charcoal hover:text-white font-medium text-sm transition-all shadow-sm border border-nhk-grey-border/60 group"
          >
            <span>Explore All Finds</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
