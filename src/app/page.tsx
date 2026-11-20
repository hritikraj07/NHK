import Link from 'next/link';
import { HeroSection } from '@/components/home/HeroSection';
import { ClothingRailHero, RailGarment } from '@/components/ui/product-rail-gallery';
import { TrendingCollections } from '@/components/home/TrendingCollections';
import { FeaturedGrid } from '@/components/home/FeaturedGrid';
import { NewsletterSection } from '@/components/home/NewsletterSection';

const FEATURED_RAIL_GARMENTS: RailGarment[] = [
  {
    id: 'nhk-003',
    name: 'Men’s Classic Collared Leather Zip Jacket',
    kind: 'jacket',
    color: '#1C1C1C',
    description: 'Supple black leather jacket with a tailored spread collar and clean zip front.',
    details: [
      '100% Genuine Leather Construction',
      'Minimalist Spread Collar',
      'Smooth Full-Zip Front Closure',
      'Tailored Regular Fit Silhouette',
    ],
    image: 'https://files.catbox.moe/vd5jw3.png',
    sideImage: 'https://files.catbox.moe/co0c55.webp',
    href: '/product/mens-classic-collared-leather-jacket',
  },
  {
    id: 'nhk-002',
    name: 'Wear Lusso Men’s Quarter-Zip Knitted Sweater',
    kind: 'knit',
    color: '#D4CEBE',
    description: 'Textured color-block winter pullover with a warm zip collar.',
    details: [
      'Textured Knit Blend',
      'Stand Collar with Quarter-Zip',
      'Modern Color-Block Styling',
      'Warm Cold-Weather Layering',
    ],
    image: 'https://files.catbox.moe/4n72m3.png',
    sideImage: 'https://files.catbox.moe/inlm58.webp',
    href: '/product/wear-lusso-mens-knitted-sweater',
  },
];

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <ClothingRailHero
        items={FEATURED_RAIL_GARMENTS}
        hanger="none"
        eyebrow="Interactive Wardrobe Rail · Curated Selection"
        heading="Tactile Discovery on the Rail"
        caption="Hover along the rail to turn pieces forward, or click any piece to explore full editorial specifications."
        autoplay={true}
        className="border-b border-nhk-grey-border/60 py-8 md:py-12"
        action={
          <Link
            href="/categories/fashion"
            className="inline-flex items-center gap-2 rounded-full bg-nhk-charcoal px-6 py-3 text-xs font-medium uppercase tracking-widest text-nhk-bg shadow-sm transition-all duration-300 hover:bg-nhk-accent hover:shadow-md"
          >
            <span>Explore Fashion Collection</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        }
      />
      <TrendingCollections />
      <FeaturedGrid />
      <NewsletterSection />
    </div>
  );
}
