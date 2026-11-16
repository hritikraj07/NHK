'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { getAllProducts } from '@/lib/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initial load from storage / defaults
    setProducts(getAllProducts());
    setIsLoaded(true);

    const handleUpdate = () => {
      setProducts(getAllProducts());
    };

    window.addEventListener('nhk_products_updated', handleUpdate);
    return () => {
      window.removeEventListener('nhk_products_updated', handleUpdate);
    };
  }, []);

  return { products, isLoaded };
}
