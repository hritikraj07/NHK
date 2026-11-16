import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from '@/data/products';
import { Product } from '@/types';

let serverProducts: Product[] = [...INITIAL_PRODUCTS];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = serverProducts.find(
    (p) => p.id === params.id || p.slug === params.id
  );

  if (!product) {
    return NextResponse.json(
      { success: false, error: 'Product not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, product });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const index = serverProducts.findIndex((p) => p.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    serverProducts[index] = {
      ...serverProducts[index],
      ...body,
      id: params.id,
    };

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: serverProducts[index],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = serverProducts.findIndex((p) => p.id === params.id);

  if (index === -1) {
    return NextResponse.json(
      { success: false, error: 'Product not found' },
      { status: 404 }
    );
  }

  serverProducts = serverProducts.filter((p) => p.id !== params.id);

  return NextResponse.json({
    success: true,
    message: 'Product deleted successfully',
  });
}
