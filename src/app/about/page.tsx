import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Heart, Compass, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'About NHK — Discover Products Worth Loving',
  description:
    'Learn about NHK, our editorial philosophy, testing standards, and why we exist to help you discover products worth loving.',
};

export default function AboutPage() {
  return (
    <div className="py-16 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nhk-beige text-nhk-charcoal text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-nhk-accent" />
            <span>The NHK Manifesto</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-nhk-charcoal tracking-tight">
            Discover Products <br />
            <span className="italic font-serif font-normal text-nhk-accent">Worth Loving.</span>
          </h1>
          <p className="text-base sm:text-lg text-nhk-grey max-w-2xl mx-auto leading-relaxed">
            In an era of relentless hyper-consumerism and algorithmically generated junk, NHK serves as an antidote: a quiet, intentional space devoted to enduring craftsmanship.
          </p>
        </div>

        {/* Hero Editorial Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-nhk-beige shadow-card border border-nhk-grey-border">
          <Image
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80"
            alt="Interior design studio workspace"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-nhk-charcoal/20" />
          <div className="absolute bottom-6 left-6 right-6 text-white text-xs sm:text-sm font-medium">
            Studio NHK • Sharing objects that elevate daily living since 2026.
          </div>
        </div>

        {/* Core Pillars */}
        <div className="space-y-8">
          <div className="border-b border-nhk-beige pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nhk-charcoal">
              Our Editorial Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-nhk-beige space-y-3">
              <div className="w-10 h-10 rounded-full bg-nhk-beige flex items-center justify-center text-nhk-accent">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-nhk-charcoal">
                1. Purposeful Utility
              </h3>
              <p className="text-xs text-nhk-grey leading-relaxed">
                We ignore fleeting gimmicks. Every recommended object must solve a genuine problem or provide lasting tactile joy in your daily routine.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-nhk-beige space-y-3">
              <div className="w-10 h-10 rounded-full bg-nhk-beige flex items-center justify-center text-nhk-accent">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-nhk-charcoal">
                2. Honest Restraint
              </h3>
              <p className="text-xs text-nhk-grey leading-relaxed">
                We believe in buying fewer, better things. If an item cannot withstand at least five years of frequent use, it does not belong in our edits.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-nhk-beige space-y-3">
              <div className="w-10 h-10 rounded-full bg-nhk-beige flex items-center justify-center text-nhk-accent">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-nhk-charcoal">
                3. Total Transparency
              </h3>
              <p className="text-xs text-nhk-grey leading-relaxed">
                We are 100% reader-supported. We clearly mark affiliate links and never permit brands to purchase favorable ratings or biased placements.
              </p>
            </div>
          </div>
        </div>

        {/* Narrative Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-nhk-grey-border shadow-sm space-y-6 text-nhk-charcoal/90 leading-relaxed text-sm sm:text-base">
          <h3 className="font-serif text-2xl font-bold text-nhk-charcoal">
            Why We Started NHK
          </h3>
          <p>
            We spent years navigating product reviews polluted by bot-written listicles, fake five-star customer feedback, and drop-shipped knockoffs flooding major marketplaces. It became nearly impossible to find honest, design-forward recommendations for simple things: a commuter tote that wouldn&apos;t fray, an incense holder that didn&apos;t spill ash, or an ultra-quiet mechanical keyboard suited for shared studios.
          </p>
          <p>
            NHK was created to restore delight to product discovery. Our editors test and select items across five essential categories: fashion, tech, home living, beauty rituals, and daily essentials.
          </p>
          <p>
            We combine high-resolution visual collections tailored for Pinterest lovers with rigorous journalistic transparency. We hope every discovery you make here becomes a treasured part of your everyday life.
          </p>
        </div>

        {/* Team & Contact CTA */}
        <div className="text-center space-y-6 pt-4">
          <h3 className="font-serif text-2xl font-bold text-nhk-charcoal">
            Have a product you think we should examine?
          </h3>
          <p className="text-sm text-nhk-grey max-w-md mx-auto">
            We love hearing from independent designers, sustainable ateliers, and passionate readers.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-nhk-charcoal text-white hover:bg-nhk-accent text-sm font-semibold transition-all shadow-sm"
            >
              Get in Touch With Editors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
