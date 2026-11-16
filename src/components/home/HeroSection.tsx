import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* Background Subtle Ambient Circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-nhk-beige/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-nhk-accent/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nhk-beige border border-nhk-grey-border text-nhk-charcoal text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-nhk-accent" />
              <span>Independent Product Discovery Desk</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-nhk-charcoal tracking-tight leading-[1.1]">
              Find Your Next <br />
              <span className="italic font-normal font-serif text-nhk-accent">
                Favorite
              </span>{' '}
              Thing.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-nhk-grey max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Discover thoughtfully curated products, trending finds, and everyday essentials. We filter through thousands of objects so you only buy what brings lasting utility and beauty.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/explore"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-nhk-charcoal text-white font-medium text-sm hover:bg-nhk-accent hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Collections</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/categories"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white border border-nhk-grey-border text-nhk-charcoal font-medium text-sm hover:bg-nhk-beige transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Compass className="w-4 h-4 text-nhk-accent" />
                <span>Browse by Category</span>
              </Link>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-6 border-t border-nhk-beige/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-xs text-nhk-grey">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-nhk-accent" />
                <span>Verified Affiliate Links</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Real Editorial Testing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-nhk-charcoal" />
                <span>Updated Weekly</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Main Vertical Image Card */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-nhk-beige">
                <Image
                  src="/van-gogh-irises-metal-bookmark.jpg"
                  alt="Van Gogh Irises Vintage Metal Bookmark"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nhk-charcoal/80 via-transparent to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                    Featured Discovery
                  </span>
                  <h3 className="font-serif text-xl font-bold">
                    Van Gogh Irises Vintage Metal Bookmark
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-1">
                    Exquisite hollow brass with vibrant blue enamel and silk tassel.
                  </p>
                </div>
              </div>

              {/* Floating Sub-Card for Editorial Trust / Pinterest Callout */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-nhk-beige max-w-[220px] hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.48.03-3.55.15-.97 1-4.22 1-4.22s-.25-.52-.25-1.28c0-1.2.7-2.1 1.57-2.1.74 0 1.1.56 1.1 1.23 0 .75-.48 1.86-.72 2.9-.2.87.43 1.58 1.3 1.58 1.56 0 2.76-1.64 2.76-4.02 0-2.1-1.5-3.57-3.66-3.57-2.5 0-3.96 1.87-3.96 3.8 0 .75.29 1.56.65 2 .07.09.08.17.06.26l-.24 1c-.04.16-.14.2-.32.11-1.18-.55-1.92-2.28-1.92-3.66 0-2.98 2.16-5.72 6.25-5.72 3.28 0 5.83 2.34 5.83 5.46 0 3.26-2.05 5.88-4.9 5.88-.96 0-1.86-.5-2.17-1.09l-.59 2.25c-.21.83-.8 1.86-1.19 2.51A12.02 12.02 0 1 0 12 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-nhk-charcoal">Pinterest Trend</p>
                    <p className="text-[10px] text-nhk-grey">+4.5k Pins This Month</p>
                  </div>
                </div>
              </div>

              {/* Floating Top-Right Mini Badge */}
              <div className="absolute -top-4 -right-4 bg-nhk-charcoal text-white text-xs px-3.5 py-1.5 rounded-full shadow-lg font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Verified Deal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
