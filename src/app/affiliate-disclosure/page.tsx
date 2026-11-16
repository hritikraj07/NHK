import Link from 'next/link';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Affiliate Disclosure & Transparency — NHK',
  description:
    'NHK is an independent publication. As an Amazon Associate, NHK earns from qualifying purchases.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="py-16 bg-[#FAF9F6]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-4 border-b border-nhk-beige pb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nhk-beige text-nhk-charcoal text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-nhk-accent" />
            <span>Editorial Transparency</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-nhk-charcoal">
            Affiliate Disclosure
          </h1>
          <p className="text-xs text-nhk-grey uppercase tracking-widest">
            Last Updated: November 2026
          </p>
        </div>

        {/* Core Disclosure Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-nhk-grey-border shadow-sm space-y-4">
          <h2 className="font-serif text-lg font-bold text-nhk-charcoal">
            Amazon Associates Disclosure
          </h2>
          <p className="text-sm text-nhk-charcoal/90 leading-relaxed font-medium">
            NHK is a participant in the Amazon Services LLC Associates Program. As an Amazon Associate, NHK earns from qualifying purchases.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 text-xs text-nhk-grey border-t border-nhk-beige/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> You pay the exact same price
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> No sponsored bias
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Authentic product recommendations
            </span>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-sm text-nhk-charcoal/80 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-nhk-charcoal">
              1. Editorial Independence
            </h2>
            <p>
              NHK is an independent digital publication dedicated to discovering products worth loving. Our recommendations are determined by aesthetic quality, build standards, and real-world utility. We do not accept paid placements, gifts, or incentives in exchange for favorable reviews or placement on our website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-nhk-charcoal">
              2. Pricing & Availability
            </h2>
            <p>
              Product pricing, shipping terms, and stock availability on external retailer websites change frequently. Always confirm the final price, shipping costs, and return policies directly on Amazon checkout before completing any purchase.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-nhk-charcoal">
              3. Questions & Contact
            </h2>
            <p>
              If you have any questions regarding our editorial standards or recommendations, please reach out to our team via our{' '}
              <Link href="/contact" className="text-nhk-accent underline font-medium">
                contact page
              </Link>{' '}
              or directly at <code>nhkhritxkk@gmail.com</code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}