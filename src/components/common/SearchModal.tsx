'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { Product } from '@/types';
import { getAllProducts } from '@/lib/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const all = getAllProducts();
    const q = query.toLowerCase().trim();
    const filtered = all.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.merchant.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
    setResults(filtered.slice(0, 6));
  }, [query]);

  if (!isOpen) return null;

  const popularSearches = ['Leather Tote', 'Wireless Earbuds', 'Travertine', 'Ceramic Carafe', 'Desk Setup', 'Skincare'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-nhk-charcoal/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#FAF9F6] rounded-2xl shadow-2xl border border-nhk-beige overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-nhk-beige bg-white">
          <Search className="w-5 h-5 text-nhk-grey flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands, or categories..."
            className="w-full bg-transparent text-nhk-charcoal placeholder-nhk-grey text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-nhk-grey hover:text-nhk-charcoal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider text-nhk-grey hover:text-nhk-charcoal px-2 py-1 rounded border border-nhk-beige ml-1"
          >
            ESC
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Results */}
          {results.length > 0 ? (
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-nhk-grey mb-3">
                Matching Finds ({results.length})
              </p>
              <div className="space-y-3">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-nhk-beige-light transition-colors group border border-transparent hover:border-nhk-beige"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-nhk-beige flex-shrink-0">
                      <Image
                        src={product.primaryImage}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-semibold text-nhk-accent tracking-wider">
                          {product.category}
                        </span>
                        <span className="text-xs text-nhk-grey">• {product.merchant}</span>
                      </div>
                      <h4 className="text-sm font-medium text-nhk-charcoal truncate group-hover:text-nhk-accent transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-nhk-grey truncate">{product.tagline}</p>
                    </div>
                    <div className="text-right flex-shrink-0 flex items-center gap-2">
                      <span className="text-sm font-semibold text-nhk-charcoal">
                        ${product.price}
                      </span>
                      <ArrowRight className="w-4 h-4 text-nhk-grey group-hover:text-nhk-accent group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : query.trim() !== '' ? (
            <div className="py-12 text-center text-nhk-grey">
              <p className="text-base text-nhk-charcoal font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1">Try searching for &lsquo;tote&rsquo;, &lsquo;audio&rsquo;, or browse our categories.</p>
            </div>
          ) : (
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-nhk-grey mb-3 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full text-xs bg-nhk-beige/70 hover:bg-nhk-beige text-nhk-charcoal transition-colors border border-nhk-grey-border/50"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-nhk-beige/40 border-t border-nhk-beige flex items-center justify-between text-xs text-nhk-grey">
          <span>Explore handpicked lifestyle, home, and tech design</span>
          <Link
            href="/explore"
            onClick={onClose}
            className="text-nhk-charcoal font-medium hover:text-nhk-accent flex items-center gap-1"
          >
            Browse all products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
