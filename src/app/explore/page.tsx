'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, ArrowUpDown, X, Tag, RotateCcw } from 'lucide-react';
import { PinterestMasonry } from '@/components/products/PinterestMasonry';
import { useProducts } from '@/hooks/useProducts';
import { CATEGORIES } from '@/data/categories';
import { SortOption } from '@/types';

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('q') || '';

  const { products, isLoaded } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under50' | 'under100' | '100plus'>('all');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Keyword search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.merchant.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Price bracket
    if (priceFilter === 'under50') {
      list = list.filter((p) => p.price <= 50);
    } else if (priceFilter === 'under100') {
      list = list.filter((p) => p.price <= 100);
    } else if (priceFilter === '100plus') {
      list = list.filter((p) => p.price > 100);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'featured':
      default:
        list.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return (b.pinterestShareCount ?? 0) - (a.pinterestShareCount ?? 0);
        });
        break;
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy, priceFilter]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setPriceFilter('all');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' || searchQuery !== '' || priceFilter !== 'all' || sortBy !== 'featured';

  return (
    <div className="py-12 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title / Editorial Breadcrumb */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-nhk-accent mb-2">
            <span>Product Discovery</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-nhk-charcoal">
            The Complete Edit
          </h1>
          <p className="text-sm text-nhk-grey mt-2 max-w-xl">
            Explore our comprehensive index of vetted essentials, artisanal home accents, and tactile design items.
          </p>
        </div>

        {/* Filter and Control Bar */}
        <div className="bg-white rounded-2xl border border-nhk-beige p-5 mb-10 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, materials, brands..."
                className="w-full px-5 py-2.5 rounded-full bg-nhk-beige/50 border border-nhk-grey-border text-sm text-nhk-charcoal placeholder-nhk-grey focus:outline-none focus:ring-2 focus:ring-nhk-charcoal/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-nhk-grey hover:text-nhk-charcoal"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sorting & Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sort By */}
              <div className="flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-nhk-grey" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 rounded-full bg-nhk-beige/60 border border-nhk-grey-border text-xs text-nhk-charcoal font-medium focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Recently Added</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-3 py-2 rounded-full border border-nhk-grey-border text-xs text-nhk-grey hover:text-nhk-charcoal hover:bg-nhk-beige transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Pills */}
          <div className="pt-2 border-t border-nhk-beige flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-nhk-charcoal text-white shadow-sm'
                  : 'bg-nhk-beige-light text-nhk-grey hover:text-nhk-charcoal hover:bg-nhk-beige border border-nhk-grey-border/50'
              }`}
            >
              All Categories ({products.length})
            </button>
            {CATEGORIES.map((cat) => {
              const count = products.filter((p) => p.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-nhk-charcoal text-white shadow-sm'
                      : 'bg-nhk-beige-light text-nhk-grey hover:text-nhk-charcoal hover:bg-nhk-beige border border-nhk-grey-border/50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-nhk-grey px-1">
          <p>
            Showing <strong className="text-nhk-charcoal">{filteredProducts.length}</strong> thoughtfully selected objects
          </p>
          {selectedCategory !== 'all' && (
            <p className="uppercase tracking-wider font-semibold text-nhk-accent">
              Filtered by: {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
            </p>
          )}
        </div>

        {/* Masonry Layout */}
        <PinterestMasonry
          products={filteredProducts}
          emptyMessage="No products matched your exact filter combination."
        />
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-nhk-grey">
          <div className="w-8 h-8 border-2 border-nhk-charcoal border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium">Loading NHK product directory...</p>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
