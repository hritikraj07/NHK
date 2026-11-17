'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { PinterestPinButton } from '../common/PinterestPinButton';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  aspect?: 'tall' | 'square' | 'vertical';
  showMerchant?: boolean;
}

export function ProductCard({
  product,
  priority = false,
  aspect = 'square',
  showMerchant = true,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const aspectClass =
    aspect === 'vertical'
      ? 'aspect-[2/3]'
      : aspect === 'tall'
        ? 'aspect-[3/4]'
        : 'aspect-square';

  return (
    <article className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-nhk-grey-border/70 hover:border-nhk-grey-border shadow-card hover:shadow-card-hover transition-all duration-300 transform-gpu hover:-translate-y-1 h-full">
      {/* Image Container with Hover Controls */}
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-nhk-beige`}>
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 block z-0"
          aria-label={`View details for ${product.name}`}
        >
          <Image
            src={product.primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            onLoad={() => setImageLoaded(true)}
          />
        </Link>

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex flex-wrap gap-1.5 pointer-events-auto">
            {product.isEditorsPick && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-nhk-charcoal/90 text-white backdrop-blur-sm shadow-sm">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Editor&apos;s Pick
              </span>
            )}
            {!product.isEditorsPick && product.isTrending && (
              <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/90 text-nhk-charcoal backdrop-blur-sm shadow-sm">
                Trending
              </span>
            )}
          </div>

          {/* Pinterest Save Button (hover reveal on desktop, always accessible) */}
          <div className="pointer-events-auto transition-opacity duration-200 opacity-90 sm:opacity-0 group-hover:opacity-100">
            <PinterestPinButton
              url={`/product/${product.slug}`}
              media={product.primaryImage}
              description={`${product.name} — ${product.tagline} via NHK`}
              variant="icon"
            />
          </div>
        </div>

        {/* Bottom Merchant Pill (Optional on Image) */}
        {showMerchant && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-md bg-white/90 text-nhk-charcoal backdrop-blur-sm shadow-sm border border-white/40">
              via {product.merchant}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Verified Note */}
          <div className="flex items-center justify-between text-xs text-nhk-grey mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[10px] text-nhk-accent">
              {product.category}
            </span>
            <span className="text-[11px]">Verified {product.verifiedDate}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg font-semibold text-nhk-charcoal leading-snug group-hover:text-nhk-accent transition-colors line-clamp-1 mb-1">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Tagline / Short Description */}
          <p className="text-xs text-nhk-grey line-clamp-2 leading-relaxed mb-4">
            {product.tagline || product.description}
          </p>
        </div>

        {/* Price & Action Section */}
        <div className="pt-3 border-t border-nhk-beige/80 flex items-center justify-between gap-3">
          {/* Price (Only when greater than 0) */}
          <div className="flex items-baseline gap-2">
            {product.price > 0 ? (
              <>
                <span className="text-base font-bold text-nhk-charcoal">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-nhk-grey line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs font-medium text-emerald-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Available on Amazon
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href={`/product/${product.slug}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-nhk-grey-border text-nhk-charcoal hover:bg-nhk-beige transition-colors flex items-center gap-1"
            >
              Details
            </Link>
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-nhk-charcoal text-white hover:bg-nhk-accent transition-colors flex items-center gap-1.5 shadow-sm"
              title={`View at ${product.merchant}`}
            >
              <span>Buy</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
