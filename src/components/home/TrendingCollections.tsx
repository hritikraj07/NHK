import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export function TrendingCollections() {
  return (
    <section className="py-20 bg-white border-y border-nhk-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-nhk-accent mb-2">
              <span>Curated Edits</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-nhk-charcoal">
              Trending Collections
            </h2>
          </div>
          <p className="text-sm text-nhk-grey max-w-md">
            Explore curated departments tailored around mindful living, intentional craftsmanship, and modern aesthetics.
          </p>
        </div>

        {/* 5-Category Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/explore?category=${category.id}`}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-nhk-beige border border-nhk-grey-border/60 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Category Image with Aspect Ratio */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-nhk-beige">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nhk-charcoal/80 via-nhk-charcoal/20 to-transparent group-hover:from-nhk-charcoal/90 transition-colors" />

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-nhk-beige mb-1">
                    {category.featuredCount} Curated Finds
                  </span>
                  <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-amber-200 transition-colors">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-nhk-beige/90 mt-3 font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                    <span>Explore Edit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
