import { INITIAL_PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { Product, Category, CategoryId, SortOption } from '@/types';

// Storage key for client-side modifications if running in browser
export const STORAGE_KEY = 'nhk_custom_products_v1';

export function getAllProducts(): Product[] {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading local products', e);
    }
  }
  return INITIAL_PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  const products = getAllProducts();
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  const products = getAllProducts();
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: CategoryId | string): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(limit = 6): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.isFeatured).slice(0, limit);
}

export function getEditorsPicks(limit = 4): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.isEditorsPick).slice(0, limit);
}

export function getTrendingProducts(limit = 6): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.isTrending).slice(0, limit);
}

export function getPinterestFinds(limit = 8): Product[] {
  const products = getAllProducts();
  return products.filter((p) => p.isPinterestFind).slice(0, limit);
}

export function getRelatedProducts(currentId: string, category: CategoryId, limit = 4): Product[] {
  const products = getAllProducts();
  return products
    .filter((p) => p.id !== currentId && p.category === category)
    .slice(0, limit);
}

export function getAllCategories(): Category[] {
  return CATEGORIES;
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id || c.slug === id);
}

export function filterAndSortProducts(
  products: Product[],
  options: {
    category?: string;
    search?: string;
    sortBy?: SortOption;
    tag?: string;
    minPrice?: number;
    maxPrice?: number;
  }
): Product[] {
  let result = [...products];

  // Category filter
  if (options.category && options.category !== 'all') {
    result = result.filter(
      (p) => p.category.toLowerCase() === options.category?.toLowerCase()
    );
  }

  // Tag filter
  if (options.tag) {
    result = result.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === options.tag?.toLowerCase())
    );
  }

  // Search filter
  if (options.search && options.search.trim() !== '') {
    const q = options.search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.merchant.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Price bounds
  if (options.minPrice !== undefined) {
    result = result.filter((p) => p.price >= (options.minPrice ?? 0));
  }
  if (options.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= (options.maxPrice ?? Infinity));
  }

  // Sorting
  switch (options.sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      result.sort((a, b) => b.id.localeCompare(a.id));
      break;
    case 'featured':
    default:
      result.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return (b.pinterestShareCount ?? 0) - (a.pinterestShareCount ?? 0);
      });
      break;
  }

  return result;
}

// Client-side local storage mutations for admin demo
export function saveProductToStorage(product: Product): Product[] {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  const current = getAllProducts();
  const existingIdx = current.findIndex((p) => p.id === product.id);

  let updated: Product[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = product;
  } else {
    updated = [product, ...current];
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('nhk_products_updated'));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
  return updated;
}

export function deleteProductFromStorage(id: string): Product[] {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  const current = getAllProducts();
  const updated = current.filter((p) => p.id !== id);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('nhk_products_updated'));
  } catch (e) {
    console.error('Failed to delete from localStorage', e);
  }
  return updated;
}

export function resetProductsToDefault(): Product[] {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('nhk_products_updated'));
  } catch (e) {
    console.error('Failed to reset localStorage', e);
  }
  return INITIAL_PRODUCTS;
}
