'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { PinterestPinButton } from '../common/PinterestPinButton';

export function EditorsPicks() {
  const { products } = useProducts();
  const picks = products.filter((p) => p.isEditorsPick).slice(0, 3);

  return (
    <section className="py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-nhk-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Honest Evaluation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-nhk-charcoal">
            Editor&apos;s Picks
          </h2>
          <p className="text-sm sm:text-base text-nhk-grey">
            Every piece below has been examined by our editorial desk for build quality, tactile satisfaction, and real-world durability.
          </p>
        </div>

        {/* 3 Large Editorial Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {picks.map((product) => (
            <div
              key={product.id}
              className="flex flex-col rounded-3xl bg-white border border-nhk-grey-border/80 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {/* Image with Pin Button */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-nhk-beige">
                <Image
                  src={product.primaryImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 z-10">
                  <PinterestPinButton
                    url={`/product/${product.slug}`}
                    media={product.primaryImage}
                    description={`${product.name} Editor's Pick via NHK`}
                    variant="badge"
                  />
                </div>
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-nhk-charcoal/90 text-white backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Editorial Card Body */}
              <div className="p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-nhk-grey">
                      Verified {product.verifiedDate}
                    </span>
                    <span className="text-xs font-semibold text-nhk-accent">
                      Available via {product.merchant}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-nhk-charcoal leading-snug">
                    <Link
                      href={`/product/${product.slug}`}
                      className="hover:text-nhk-accent transition-colors"
                    >
                      {product.name}
                    </Link>
                  </h3>

                  {/* Curator Note Box */}
                  <div className="p-4 rounded-xl bg-nhk-beige-light border border-nhk-beige text-xs text-nhk-charcoal leading-relaxed space-y-1">
                    <p className="font-bold text-nhk-accent uppercase text-[10px] tracking-wider">
                      Why We Love It:
                    </p>
                    <p className="italic text-nhk-charcoal/90">
                      &ldquo;{product.curatorNote || product.description}&rdquo;
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-1.5 text-xs text-nhk-grey pt-1">
                    {product.pros.slice(0, 2).map((pro, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-nhk-beige flex items-center justify-between gap-3">
                  <Link
                    href={`/product/${product.slug}`}
                    className="text-xs font-semibold text-nhk-charcoal hover:text-nhk-accent underline underline-offset-4"
                  >
                    Read Full Review
                  </Link>

                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-nhk-charcoal text-white hover:bg-nhk-accent text-xs font-medium transition-colors shadow-sm"
                  >
                    <span>Check on {product.merchant}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
