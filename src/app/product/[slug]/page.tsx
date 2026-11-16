import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  Store,
  Tag,
  Clock,
  Share2,
} from 'lucide-react';
import { getAllProducts, getProductBySlug, getRelatedProducts } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';
import { PinterestPinButton } from '@/components/common/PinterestPinButton';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found — NHK' };

  return {
    title: `${product.name} — Review & Where to Buy | NHK`,
    description: `${product.tagline} Read our verified editorial review, specifications, pros, and where to purchase at ${product.merchant}.`,
    openGraph: {
      title: `${product.name} — NHK Editorial Review`,
      description: product.tagline,
      type: 'article',
      url: `https://nhkcurated.com/product/${product.slug}`,
      images: [
        {
          url: product.primaryImage,
          width: 1000,
          height: 1500,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.tagline,
      images: [product.primaryImage],
    },
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.id, product.category, 3);

  // Schema.org Product structured data
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.merchant,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: product.affiliateUrl,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="py-10 bg-[#FAF9F6]">
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-nhk-grey mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-nhk-charcoal transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/explore" className="hover:text-nhk-charcoal transition-colors">
            Explore
          </Link>
          <span>/</span>
          <Link
            href={`/explore?category=${product.category}`}
            className="hover:text-nhk-charcoal uppercase tracking-wider text-[11px] font-semibold text-nhk-accent transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-nhk-charcoal truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Hero Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Visual Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Pinterest 3:4 Vertical Image */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-3xl overflow-hidden bg-nhk-beige border border-nhk-grey-border shadow-soft group">
              <Image
                src={product.primaryImage}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              {/* Pin This Action Overlay */}
              <div className="absolute top-4 right-4 z-10">
                <PinterestPinButton
                  url={`/product/${product.slug}`}
                  media={product.primaryImage}
                  description={`${product.name} — ${product.tagline} via NHK`}
                  variant="solid"
                  label="Save to Pinterest"
                />
              </div>

              {/* Verified Badge */}
              <div className="absolute bottom-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-nhk-charcoal/90 text-white text-xs font-medium backdrop-blur-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Find</span>
                </span>
              </div>
            </div>

            {/* Supplementary Angles / Thumbnails */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((imgUrl, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-2xl overflow-hidden bg-nhk-beige border border-nhk-grey-border"
                  >
                    <Image
                      src={imgUrl}
                      alt={`${product.name} detail view ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Editorial Details & Affiliate Action (5 cols) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-widest text-nhk-accent">
                  {product.category}
                </span>
                <span className="text-xs text-nhk-grey flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Checked {product.verifiedDate}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-nhk-charcoal leading-tight">
                {product.name}
              </h1>

              <p className="text-base text-nhk-grey font-medium leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Verified Retailer & Affiliate Card */}
            <div className="p-6 rounded-2xl bg-white border border-nhk-grey-border shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-semibold text-nhk-grey block mb-1">
                    Availability
                  </span>
                  <span className="text-sm font-semibold text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Available on Amazon
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-nhk-grey block">Retail Partner</span>
                  <span className="text-sm font-semibold text-nhk-charcoal flex items-center gap-1 justify-end">
                    <Store className="w-3.5 h-3.5 text-nhk-accent" />
                    {product.merchant}
                  </span>
                </div>
              </div>

              {/* PRIMARY AFFILIATE BUTTON */}
              <div>
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="sponsored nofollow noopener noreferrer"
                  className="w-full py-4 px-6 rounded-full bg-nhk-charcoal hover:bg-nhk-accent text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                >
                  <span>Check Price on {product.merchant}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Curator Recommendation Callout */}
            {product.curatorNote && (
              <div className="p-5 rounded-2xl bg-[#EDE8DF]/60 border border-nhk-beige space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-nhk-accent uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curator&apos;s Field Note</span>
                </div>
                <p className="text-xs sm:text-sm text-nhk-charcoal italic leading-relaxed">
                  &ldquo;{product.curatorNote}&rdquo;
                </p>
              </div>
            )}

            {/* Key Features Bullet List */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-nhk-charcoal">
                Key Specifications
              </h3>
              <ul className="space-y-2 text-sm text-nhk-grey">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-nhk-accent mt-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {product.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/explore?q=${encodeURIComponent(tag)}`}
                  className="text-xs px-3 py-1 rounded-full bg-nhk-beige text-nhk-charcoal hover:bg-nhk-charcoal hover:text-white transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* In-Depth Editorial Review Section: Pros & Considerations */}
        <div className="mt-20 pt-16 border-t border-nhk-beige">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Full Review Text */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-nhk-accent">
                <span>The Editorial Review</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-nhk-charcoal">
                Why {product.name} Earned Our Recommendation
              </h2>
              <div className="prose prose-stone text-nhk-charcoal/90 text-sm sm:text-base leading-relaxed space-y-4">
                <p>{product.fullDescription}</p>
                <p>{product.description}</p>
              </div>
            </div>

            {/* Pros and Considerations 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pros */}
              <div className="p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>The Highlights</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-nhk-charcoal/80">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Considerations */}
              <div className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Considerations Before Buying</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-nhk-charcoal/80">
                  {product.considerations.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sticky Bottom Affiliate CTA for High Conversions */}
            <div className="p-8 rounded-3xl bg-nhk-charcoal text-white text-center space-y-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                Ready to explore {product.name}?
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto">
                Check current availability and shipping options directly at {product.merchant}.
              </p>
              <div className="pt-2">
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="sponsored nofollow noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-nhk-charcoal hover:bg-nhk-beige font-semibold text-sm transition-all shadow-md"
                >
                  <span>View Product at {product.merchant}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t border-nhk-beige">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-nhk-accent block mb-1">
                  More in {product.category}
                </span>
                <h3 className="font-serif text-2xl font-bold text-nhk-charcoal">
                  Related Curations
                </h3>
              </div>
              <Link
                href={`/explore?category=${product.category}`}
                className="text-xs font-semibold text-nhk-charcoal hover:text-nhk-accent underline underline-offset-4"
              >
                View full collection →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rel) => (
                <ProductCard key={rel.id} product={rel} aspect="tall" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
