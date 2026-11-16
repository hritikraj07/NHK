import Link from 'next/link';
import { Logo } from './Logo';
import { ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF9F6] border-t border-nhk-beige text-nhk-charcoal mt-20">
      {/* Editorial Trust Banner */}
      <div className="border-b border-nhk-beige bg-[#EDE8DF]/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-nhk-accent shadow-sm flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-wide text-nhk-charcoal">
                Authentic Editorial Standards
              </h4>
              <p className="text-xs text-nhk-grey mt-0.5">
                Every piece is independently researched and curated. We never accept payment for positive recommendations.
              </p>
            </div>
          </div>
          <Link
            href="/affiliate-disclosure"
            className="text-xs font-semibold uppercase tracking-wider text-nhk-charcoal hover:text-nhk-accent underline underline-offset-4 flex-shrink-0"
          >
            Read Our Full Affiliate Disclosure →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" showTagline />
            <p className="text-sm text-nhk-grey leading-relaxed max-w-sm">
              NHK is an independent digital publication dedicated to thoughtful curation. We explore the intersection of quiet fashion, minimalist tech, tactile ceramics, and everyday essentials.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Pinterest */}
              <a
                href="https://in.pinterest.com/nhkhritxkk/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-nhk-grey-border text-xs font-semibold text-red-600 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.48.03-3.55.15-.97 1-4.22 1-4.22s-.25-.52-.25-1.28c0-1.2.7-2.1 1.57-2.1.74 0 1.1.56 1.1 1.23 0 .75-.48 1.86-.72 2.9-.2.87.43 1.58 1.3 1.58 1.56 0 2.76-1.64 2.76-4.02 0-2.1-1.5-3.57-3.66-3.57-2.5 0-3.96 1.87-3.96 3.8 0 .75.29 1.56.65 2 .07.09.08.17.06.26l-.24 1c-.04.16-.14.2-.32.11-1.18-.55-1.92-2.28-1.92-3.66 0-2.98 2.16-5.72 6.25-5.72 3.28 0 5.83 2.34 5.83 5.46 0 3.26-2.05 5.88-4.9 5.88-.96 0-1.86-.5-2.17-1.09l-.59 2.25c-.21.83-.8 1.86-1.19 2.51A12.02 12.02 0 1 0 12 0z" />
                </svg>
                <span>Follow on Pinterest</span>
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-nhk-charcoal mb-4">
              Explore
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-nhk-grey hover:text-nhk-charcoal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-nhk-grey hover:text-nhk-charcoal transition-colors">
                  All Finds (Explore)
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-nhk-grey hover:text-nhk-charcoal transition-colors">
                  Collections & Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-nhk-grey hover:text-nhk-charcoal transition-colors">
                  About Our Curation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-nhk-grey hover:text-nhk-charcoal transition-colors">
                  Contact Editorial
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-nhk-charcoal mb-4">
              Curated Edits
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/explore?category=fashion" className="text-nhk-grey hover:text-nhk-charcoal transition-colors">
                  Fashion & Accessories
                </Link>
              </li>
              <li>
                <Link href="/explore?category=tech" className="text-nhk-grey hover:text-nhk-charcoal transition-colors">
                  Tech & Gadgets
                </Link>
              </li>
              <li>
                <Link href="/explore?category=home" className="text-nhk-grey hover:text-nhk-charcoal transition-colors">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link href="/explore?category=beauty" className="text-nhk-grey hover:text-nhk-charcoal transition-colors">
                  Beauty & Lifestyle
                </Link>
              </li>
              <li>
                <Link href="/explore?category=essentials" className="text-nhk-grey hover:text-nhk-charcoal transition-colors">
                  Everyday Essentials
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-nhk-charcoal mb-4">
              Legal & Trust
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/affiliate-disclosure" className="text-nhk-grey hover:text-nhk-charcoal transition-colors font-medium">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-nhk-grey hover:text-nhk-charcoal transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-nhk-grey hover:text-nhk-charcoal transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-xs text-nhk-grey/60 hover:text-nhk-charcoal transition-colors flex items-center gap-1 pt-2">
                  Admin Portal <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="mt-14 pt-8 border-t border-nhk-beige text-xs text-nhk-grey">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px]">
              © {currentYear} NHK Curation Media Ltd. All rights reserved. Designed for mindful living.
            </p>
            <p className="text-[11px] flex items-center gap-1">
              Curated with <Heart className="w-3 h-3 text-nhk-accent fill-nhk-accent inline" /> for discerning spaces.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
