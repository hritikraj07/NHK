import Link from 'next/link';
import { ShieldCheck, Info, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Affiliate Disclosure & Transparency Policy — NHK',
  description:
    'Detailed disclosure regarding our affiliate links, commissions, retailer partnerships, and editorial independence standards.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="py-16 bg-[#FAF9F6]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-nhk-beige pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nhk-beige text-nhk-charcoal text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-nhk-accent" />
            <span>FTC Compliance & Editorial Transparency</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-nhk-charcoal">
            Affiliate Disclosure
          </h1>
          <p className="text-xs text-nhk-grey uppercase tracking-widest">
            Last Updated: November 2026
          </p>
        </div>

        {/* Executive Summary Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-nhk-grey-border shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-nhk-charcoal font-bold text-base">
            <Info className="w-5 h-5 text-nhk-accent" />
            <span>In Plain English:</span>
          </div>
          <p className="text-sm text-nhk-charcoal/90 leading-relaxed">
            NHK is an independently operated product discovery website. When you click on product links on this website and subsequently make a purchase, we may receive a small referral commission from the respective merchant or retailer. <strong>This occurs at absolutely no additional cost to you.</strong>
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 text-xs text-nhk-grey">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> You pay the exact same price
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> No sponsored bias
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Strict curation standards
            </span>
          </div>
        </div>

        {/* Detailed Legal and Operational Terms */}
        <div className="space-y-8 text-sm sm:text-base text-nhk-charcoal/80 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-nhk-charcoal">
              1. Federal Trade Commission (FTC) Compliance
            </h2>
            <p>
              In accordance with the Federal Trade Commission&apos;s Guides Concerning the Use of Endorsements and Testimonials in Advertising (16 CFR, Part 255), this disclosure policy is maintained to inform our visitors that relationships may exist between NHK and the merchants, manufacturers, or retailers whose products are reviewed, showcased, or linked on this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-nhk-charcoal">
              2. Editorial Independence & Non-Influence
            </h2>
            <p>
              Our editorial selections are made solely by our internal editorial team based on design merit, construction quality, customer feedback, and everyday utility. We do not accept payment, free gifts, or incentives from brands in exchange for positive reviews or preferential ranking.
            </p>
            <p>
              If a product ceases to meet our standards or becomes unavailable with poor customer resolution, we remove or update the recommendation regardless of its affiliate earnings potential.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-nhk-charcoal">
              3. Affiliate Networks & Merchant Relationships
            </h2>
            <p>
              NHK participates in various reputable affiliate marketing programs, which may include but are not limited to Amazon Associates, Nordstrom Affiliate Program, SSENSE Affiliate Program, Rakuten Advertising, CJ Affiliate, ShareASale, and Impact.
            </p>
            <p>
              As an Amazon Associate and merchant affiliate partner, NHK earns from qualifying purchases. Please note that NHK is an independent publication and is not an agent, employee, or official representative of any retailer, manufacturer, or marketplace unless an explicit formal partnership agreement is entered and disclosed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-nhk-charcoal">
              4. Pricing, Accuracy & Product Availability
            </h2>
            <p>
              Prices, specifications, and availability displayed on NHK are verified at the time of editorial review and are stated next to our verified check date. However, retail prices, discounts, stock levels, and merchant return policies fluctuate frequently.
            </p>
            <p>
              Before completing any transaction, you should always confirm the final price, shipping costs, and return policies directly on the merchant&apos;s checkout page. NHK cannot guarantee that any merchant will maintain a particular price point or honor an expired promotion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-nhk-charcoal">
              5. Questions or Corrections
            </h2>
            <p>
              If you notice an outdated price, an inactive link, or an out-of-stock item, we warmly welcome your feedback. Please contact our editorial team via our{' '}
              <Link href="/contact" className="text-nhk-accent underline font-medium">
                contact page
              </Link>{' '}
              or write to us at <code>nhkhritxkk@gmail.com</code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
