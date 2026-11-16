import Link from 'next/link';
import Image from 'next/image';
import { Logo } from './Logo';
import { ShieldCheck } from 'lucide-react';

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
                Every piece is independently researched and selected. We never accept payment for positive recommendations.
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
              NHK is an independent digital publication dedicated to discovering products worth loving. We explore the intersection of quiet fashion, minimalist tech, tactile ceramics, and everyday essentials.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Pinterest */}
              <a
                href="https://in.pinterest.com/nhkhritxkk/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-nhk-grey-border text-xs font-semibold text-nhk-charcoal hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
              >
                <Image
                  src="/pinterest-logo.png"
                  alt="Pinterest"
                  width={20}
                  height={20}
                  className="rounded-full object-contain"
                />
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
                  About NHK
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
              Collections
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
            </ul>
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="mt-14 pt-8 border-t border-nhk-beige text-xs text-nhk-grey text-center sm:text-left">
          <p className="text-[11px]">
            © {currentYear} NHK. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
