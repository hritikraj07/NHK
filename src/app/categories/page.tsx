import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { getAllProducts } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';

export const metadata = {
  title: 'Categories & Collections — NHK',
  description:
    'Browse our five core lifestyle departments: Fashion & Accessories, Tech & Gadgets, Home & Living, Beauty & Lifestyle, and Everyday Essentials.',
};

export default function CategoriesPage() {
  const allProducts = getAllProducts();

  return (
    <div className="py-16 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nhk-beige text-nhk-charcoal text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-nhk-accent" />
            <span>Product Departments</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-nhk-charcoal">
            Explore by Category
          </h1>
          <p className="text-sm sm:text-base text-nhk-grey leading-relaxed">
            Each collection is maintained by specialized editors who monitor industrial design, tactile materials, and authentic customer satisfaction.
          </p>
        </div>

        {/* Categories List with Showcase Preview */}
        <div className="space-y-20">
          {CATEGORIES.map((category, index) => {
            const categoryProducts = allProducts
              .filter((p) => p.category === category.id)
              .slice(0, 3);

            return (
              <section
                key={category.id}
                id={category.slug}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-nhk-grey-border shadow-card"
              >
                {/* Category Banner Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-nhk-beige">
                  <div className="lg:col-span-8 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs uppercase font-bold tracking-widest text-nhk-accent">
                        Department 0{index + 1}
                      </span>
                      <span className="text-xs text-nhk-grey">•</span>
                      <span className="text-xs text-nhk-grey font-medium">
                        {category.featuredCount} Featured Objects
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nhk-charcoal">
                      {category.name}
                    </h2>

                    <p className="text-sm sm:text-base text-nhk-grey max-w-2xl leading-relaxed">
                      {category.tagline} {category.description}
                    </p>
                  </div>

                  {/* CTA to Filtered Explore */}
                  <div className="lg:col-span-4 flex lg:justify-end">
                    <Link
                      href={`/explore?category=${category.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-nhk-charcoal text-white hover:bg-nhk-accent transition-all text-xs font-semibold uppercase tracking-wider group shadow-sm"
                    >
                      <span>View All in {category.name.split(' ')[0]}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Top Picks Preview */}
                <div className="pt-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-nhk-grey flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Featured in this edit</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        aspect="tall"
                      />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
