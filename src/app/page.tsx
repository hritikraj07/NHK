import { HeroSection } from '@/components/home/HeroSection';
import { TrendingCollections } from '@/components/home/TrendingCollections';
import { FeaturedGrid } from '@/components/home/FeaturedGrid';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <TrendingCollections />
      <FeaturedGrid />
      <NewsletterSection />
    </div>
  );
}
