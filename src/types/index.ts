export type CategoryId = 'fashion' | 'tech' | 'home' | 'beauty' | 'essentials';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  featuredCount: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  currency: string;
  category: CategoryId;
  merchant: string;
  affiliateUrl: string;
  primaryImage: string;
  images: string[];
  features: string[];
  pros: string[];
  considerations: string[];
  tags: string[];
  rating: number; // e.g. 4.9
  reviewCount: number;
  isFeatured: boolean;
  isEditorsPick: boolean;
  isTrending: boolean;
  isPinterestFind: boolean;
  curatorNote?: string;
  verifiedDate: string;
  inStock: boolean;
  pinterestShareCount?: number;
}

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';

export interface FilterState {
  category: string;
  search: string;
  sortBy: SortOption;
  minPrice?: number;
  maxPrice?: number;
  tag?: string;
}
