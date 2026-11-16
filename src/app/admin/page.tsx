'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Search,
  SlidersHorizontal,
  Package,
  Layers,
  Sparkles,
  Check,
  X,
  RotateCcw,
  LogOut,
  ShieldCheck,
  Share2,
} from 'lucide-react';
import { Product, CategoryId } from '@/types';
import { CATEGORIES } from '@/data/categories';
import {
  getAllProducts,
  saveProductToStorage,
  deleteProductFromStorage,
  resetProductsToDefault,
} from '@/lib/products';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [formFeatures, setFormFeatures] = useState('');
  const [formPros, setFormPros] = useState('');
  const [formCons, setFormCons] = useState('');
  const [formTags, setFormTags] = useState('');

  // Confirmation message toast
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Auth Guard
  useEffect(() => {
    const checkAuth = async () => {
      const clientSession = sessionStorage.getItem('nhk_admin_logged_in');
      try {
        const res = await fetch('/api/auth/check');
        const data = await res.json();
        if (!data.authenticated && !clientSession) {
          router.push('/admin/login');
          return;
        }
      } catch (err) {
        if (!clientSession) {
          router.push('/admin/login');
          return;
        }
      }
      setIsAuthChecking(false);
      setProducts(getAllProducts());
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    sessionStorage.removeItem('nhk_admin_logged_in');
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setCurrentProduct({
      id: `nhk-${Date.now().toString().slice(-4)}`,
      currency: '$',
      category: 'fashion',
      rating: 4.9,
      reviewCount: 1,
      inStock: true,
      isFeatured: false,
      isEditorsPick: false,
      isTrending: true,
      isPinterestFind: true,
      verifiedDate: 'November 2026',
      primaryImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'],
    });
    setFormFeatures('Handcrafted with care\n100% sustainable materials\nTested for durability');
    setFormPros('Premium finish\nExceptional everyday durability\nUnderstated luxury');
    setFormCons('Limited batch availability');
    setFormTags('minimalist, curated, essential');
    setModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setIsEditing(true);
    setCurrentProduct({ ...product });
    setFormFeatures(product.features.join('\n'));
    setFormPros(product.pros.join('\n'));
    setFormCons(product.considerations.join('\n'));
    setFormTags(product.tags.join(', '));
    setModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from the product directory?`)) {
      const updated = deleteProductFromStorage(id);
      setProducts(updated);
      showToast(`Removed "${name}"`);
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Reset product database back to original editorial presets? Any custom additions will be cleared.')) {
      const reset = resetProductsToDefault();
      setProducts(reset);
      showToast('Database reset to defaults');
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentProduct.name || !currentProduct.affiliateUrl) {
      alert('Product Name and Affiliate URL are mandatory.');
      return;
    }

    const slug =
      currentProduct.slug ||
      currentProduct.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const features = formFeatures
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const pros = formPros
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const considerations = formCons
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const tags = formTags
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const fullProduct: Product = {
      id: currentProduct.id || `nhk-${Date.now()}`,
      slug,
      name: currentProduct.name,
      tagline: currentProduct.tagline || '',
      description: currentProduct.description || '',
      fullDescription: currentProduct.fullDescription || currentProduct.description || '',
      price: Number(currentProduct.price) || 0,
      originalPrice: currentProduct.originalPrice ? Number(currentProduct.originalPrice) : undefined,
      currency: currentProduct.currency || '$',
      category: (currentProduct.category as CategoryId) || 'fashion',
      merchant: currentProduct.merchant || 'Retail Partner',
      affiliateUrl: currentProduct.affiliateUrl,
      primaryImage:
        currentProduct.primaryImage ||
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      images:
        currentProduct.images && currentProduct.images.length > 0
          ? currentProduct.images
          : [currentProduct.primaryImage || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'],
      features: features.length > 0 ? features : ['Editorial verified specifications'],
      pros: pros.length > 0 ? pros : ['High craftsmanship', 'Tactile material satisfaction'],
      considerations: considerations.length > 0 ? considerations : ['Follow manufacturer cleaning guide'],
      tags: tags.length > 0 ? tags : ['curated', 'essential'],
      rating: Number(currentProduct.rating) || 4.9,
      reviewCount: Number(currentProduct.reviewCount) || 12,
      isFeatured: !!currentProduct.isFeatured,
      isEditorsPick: !!currentProduct.isEditorsPick,
      isTrending: !!currentProduct.isTrending,
      isPinterestFind: !!currentProduct.isPinterestFind,
      curatorNote: currentProduct.curatorNote || '',
      verifiedDate: currentProduct.verifiedDate || 'November 2026',
      inStock: currentProduct.inStock !== false,
      pinterestShareCount: currentProduct.pinterestShareCount || 2150,
    };

    const updated = saveProductToStorage(fullProduct);
    setProducts(updated);
    setModalOpen(false);
    showToast(isEditing ? `Updated "${fullProduct.name}"` : `Added "${fullProduct.name}"`);
  };

  // Filter products for table
  const filteredProducts = products.filter((p) => {
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesQuery =
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.merchant.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesQuery;
  });

  if (isAuthChecking) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-nhk-charcoal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Toast notification */}
        {toastMessage && (
          <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-nhk-charcoal text-white text-xs font-semibold shadow-xl border border-nhk-accent flex items-center gap-2 animate-in slide-in-from-top-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-nhk-beige">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-nhk-accent mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Product Management</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-nhk-charcoal">
              NHK Inventory & Affiliate Desk
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDefaults}
              className="px-4 py-2 rounded-full border border-nhk-grey-border text-xs text-nhk-grey hover:text-nhk-charcoal hover:bg-nhk-beige transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full bg-white border border-nhk-grey-border text-xs text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-nhk-grey-border shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-nhk-beige flex items-center justify-center text-nhk-charcoal">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-nhk-grey">Total Products</p>
              <h3 className="font-serif text-2xl font-bold text-nhk-charcoal">
                {products.length}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-nhk-grey-border shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-nhk-beige flex items-center justify-center text-nhk-charcoal">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-nhk-grey">Categories</p>
              <h3 className="font-serif text-2xl font-bold text-nhk-charcoal">
                {CATEGORIES.length}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-nhk-grey-border shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-nhk-beige flex items-center justify-center text-nhk-charcoal">
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-nhk-grey">Editor&apos;s Picks</p>
              <h3 className="font-serif text-2xl font-bold text-nhk-charcoal">
                {products.filter((p) => p.isEditorsPick).length}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-nhk-grey-border shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-nhk-beige flex items-center justify-center text-nhk-charcoal">
              <Share2 className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-nhk-grey">Pinterest Finds</p>
              <h3 className="font-serif text-2xl font-bold text-nhk-charcoal">
                {products.filter((p) => p.isPinterestFind).length}
              </h3>
            </div>
          </div>
        </div>

        {/* Action / Filter Bar */}
        <div className="bg-white rounded-2xl p-5 border border-nhk-beige shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-nhk-grey absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products or merchants..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-nhk-beige/50 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-full bg-nhk-beige/50 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="w-full md:w-auto px-6 py-2.5 rounded-full bg-nhk-charcoal hover:bg-nhk-accent text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-3xl border border-nhk-grey-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#EDE8DF]/60 border-b border-nhk-beige text-[11px] uppercase tracking-wider font-semibold text-nhk-charcoal">
                <tr>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Merchant & Affiliate</th>
                  <th className="py-4 px-4">Badges</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-nhk-beige/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-nhk-beige/20 transition-colors">
                    {/* Product Name & Image */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-nhk-beige flex-shrink-0 border border-nhk-grey-border">
                          <Image src={p.primaryImage} alt={p.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 max-w-xs">
                          <p className="font-serif font-bold text-nhk-charcoal truncate">
                            {p.name}
                          </p>
                          <p className="text-xs text-nhk-grey truncate">{p.tagline}</p>
                          <Link
                            href={`/product/${p.slug}`}
                            className="text-[11px] text-nhk-accent hover:underline flex items-center gap-0.5 mt-0.5"
                          >
                            View Live <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="text-xs uppercase font-semibold px-2.5 py-1 rounded-full bg-nhk-beige text-nhk-charcoal">
                        {p.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4">
                      <span className="font-semibold text-nhk-charcoal">${p.price}</span>
                      {p.originalPrice && (
                        <span className="text-xs text-nhk-grey line-through ml-1.5">
                          ${p.originalPrice}
                        </span>
                      )}
                    </td>

                    {/* Merchant & Affiliate URL */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1 max-w-[200px]">
                        <span className="text-xs font-semibold text-nhk-charcoal">{p.merchant}</span>
                        <a
                          href={p.affiliateUrl}
                          target="_blank"
                          rel="sponsored nofollow noopener noreferrer"
                          className="text-[11px] text-nhk-grey hover:text-nhk-accent truncate flex items-center gap-1"
                          title={p.affiliateUrl}
                        >
                          <span className="truncate">{p.affiliateUrl}</span>
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                      </div>
                    </td>

                    {/* Badges */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {p.isFeatured && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                            Featured
                          </span>
                        )}
                        {p.isEditorsPick && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-800 border border-stone-300">
                            Editor&apos;s Pick
                          </span>
                        )}
                        {p.isPinterestFind && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                            Pinterest
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 rounded-lg border border-nhk-grey-border text-nhk-charcoal hover:bg-nhk-beige hover:border-nhk-charcoal transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Add or Edit Product */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nhk-charcoal/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-nhk-grey-border shadow-2xl my-8">
              <div className="flex items-center justify-between pb-4 border-b border-nhk-beige mb-6">
                <h3 className="font-serif text-xl font-bold text-nhk-charcoal">
                  {isEditing ? 'Edit Affiliate Product' : 'Add New Curated Product'}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 text-nhk-grey hover:text-nhk-charcoal rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={currentProduct.name || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                      placeholder="e.g. Minimalist Italian Leather Tote"
                      className="w-full px-4 py-2.5 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none"
                      required
                    />
                  </div>

                  {/* Tagline */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-1">
                      Short Tagline
                    </label>
                    <input
                      type="text"
                      value={currentProduct.tagline || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, tagline: e.target.value })}
                      placeholder="e.g. Full-grain Tuscan leather with raw suede interior."
                      className="w-full px-4 py-2.5 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-1">
                      Category *
                    </label>
                    <select
                      value={currentProduct.category || 'fashion'}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          category: e.target.value as CategoryId,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none cursor-pointer"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Merchant Name */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-1">
                      Merchant / Store
                    </label>
                    <input
                      type="text"
                      value={currentProduct.merchant || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, merchant: e.target.value })}
                      placeholder="e.g. Nordstrom, Amazon, Apple"
                      className="w-full px-4 py-2.5 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none"
                    />
                  </div>

                  {/* Verified Price */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-1">
                      Verified Price ($) *
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={currentProduct.price || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, price: Number(e.target.value) })}
                      placeholder="e.g. 320"
                      className="w-full px-4 py-2.5 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none"
                      required
                    />
                  </div>

                  {/* Original Price */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-1">
                      Original Price ($ optional)
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={currentProduct.originalPrice || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, originalPrice: Number(e.target.value) })}
                      placeholder="e.g. 385"
                      className="w-full px-4 py-2.5 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none"
                    />
                  </div>

                  {/* Affiliate URL */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-1">
                      Affiliate URL *
                    </label>
                    <input
                      type="url"
                      value={currentProduct.affiliateUrl || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, affiliateUrl: e.target.value })}
                      placeholder="https://www.nordstrom.com/s/... or https://amazon.com/dp/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none"
                      required
                    />
                  </div>

                  {/* Primary Image URL */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-1">
                      Primary Vertical Image (Unsplash URL or image link)
                    </label>
                    <input
                      type="url"
                      value={currentProduct.primaryImage || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, primaryImage: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none"
                    />
                  </div>

                  {/* Short Description */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={currentProduct.description || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none"
                    />
                  </div>

                  {/* Full Description */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-1">
                      Full Editorial Review
                    </label>
                    <textarea
                      rows={3}
                      value={currentProduct.fullDescription || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, fullDescription: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none"
                    />
                  </div>

                  {/* Curator Note */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-1">
                      Curator Note (&ldquo;Why We Love It&rdquo;)
                    </label>
                    <textarea
                      rows={2}
                      value={currentProduct.curatorNote || ''}
                      onChange={(e) => setCurrentProduct({ ...currentProduct, curatorNote: e.target.value })}
                      placeholder="Our personal field recommendation..."
                      className="w-full px-4 py-2 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none"
                    />
                  </div>

                  {/* Features (one per line) */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-1">
                      Features / Specifications (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={formFeatures}
                      onChange={(e) => setFormFeatures(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none font-mono"
                    />
                  </div>

                  {/* Pros & Considerations */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-1">
                      Pros (one per line)
                    </label>
                    <textarea
                      rows={2}
                      value={formPros}
                      onChange={(e) => setFormPros(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-1">
                      Considerations (one per line)
                    </label>
                    <textarea
                      rows={2}
                      value={formCons}
                      onChange={(e) => setFormCons(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none"
                    />
                  </div>

                  {/* Tags */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase font-semibold text-nhk-charcoal mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      placeholder="minimalist, leather, travel, nordstrom"
                      className="w-full px-4 py-2 rounded-xl bg-nhk-beige/40 border border-nhk-grey-border text-xs text-nhk-charcoal focus:outline-none"
                    />
                  </div>

                  {/* Flags */}
                  <div className="sm:col-span-2 pt-2 border-t border-nhk-beige flex flex-wrap gap-4">
                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-nhk-charcoal cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!currentProduct.isFeatured}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, isFeatured: e.target.checked })}
                        className="rounded text-nhk-charcoal"
                      />
                      <span>Featured on Homepage</span>
                    </label>

                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-nhk-charcoal cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!currentProduct.isEditorsPick}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, isEditorsPick: e.target.checked })}
                        className="rounded text-nhk-charcoal"
                      />
                      <span>Editor&apos;s Pick</span>
                    </label>

                    <label className="inline-flex items-center gap-2 text-xs font-semibold text-nhk-charcoal cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!currentProduct.isPinterestFind}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, isPinterestFind: e.target.checked })}
                        className="rounded text-nhk-charcoal"
                      />
                      <span>Pinterest Find</span>
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-nhk-beige flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-nhk-grey-border text-xs text-nhk-grey hover:text-nhk-charcoal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-2.5 rounded-full bg-nhk-charcoal hover:bg-nhk-accent text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
                  >
                    {isEditing ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
