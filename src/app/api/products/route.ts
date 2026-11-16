import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '@/data/products';
import { Product } from '@/types';

// In-memory store for server lifetime
let serverProducts: Product[] = [...INITIAL_PRODUCTS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('q');

  let results = [...serverProducts];

  if (category && category !== 'all') {
    results = results.filter((p) => p.category === category);
  }

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    products: results,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.affiliateUrl || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Product name, category, and affiliate URL are required.' },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: body.id || `nhk-${Date.now()}`,
      slug:
        body.slug ||
        body.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, ''),
      name: body.name,
      tagline: body.tagline || '',
      description: body.description || '',
      fullDescription: body.fullDescription || body.description || '',
      price: Number(body.price) || 0,
      originalPrice: body.originalPrice ? Number(body.originalPrice) : undefined,
      currency: body.currency || '$',
      category: body.category,
      merchant: body.merchant || 'Retail Partner',
      affiliateUrl: body.affiliateUrl,
      primaryImage:
        body.primaryImage ||
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      images: body.images?.length
        ? body.images
        : [body.primaryImage || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'],
      features: body.features || [],
      pros: body.pros || [],
      considerations: body.considerations || [],
      tags: body.tags || [],
      rating: body.rating || 4.9,
      reviewCount: body.reviewCount || 1,
      isFeatured: !!body.isFeatured,
      isEditorsPick: !!body.isEditorsPick,
      isTrending: !!body.isTrending,
      isPinterestFind: !!body.isPinterestFind,
      curatorNote: body.curatorNote || '',
      verifiedDate: body.verifiedDate || 'November 2026',
      inStock: body.inStock !== false,
      pinterestShareCount: 0,
    };

    serverProducts = [newProduct, ...serverProducts];

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
