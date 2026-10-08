import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Star, 
  Search, 
  Zap, 
  ArrowRight,
  PlusCircle,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { ProductItem, ItemType } from '../types';
import { CATEGORIES } from '../data/initialData';
import { handleImageError } from '../utils/imageFallback';

interface BrowseMarketplaceProps {
  products: ProductItem[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onBookNow: (item: ProductItem) => void;
  onQuickView: (item: ProductItem) => void;
  onGoToPost: () => void;
}

export const BrowseMarketplace: React.FC<BrowseMarketplaceProps> = ({
  products,
  searchQuery,
  setSearchQuery,
  onBookNow,
  onQuickView,
  onGoToPost
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [selectedType, setSelectedType] = useState<'all' | ItemType>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  // Filter products
  const filteredProducts = products.filter(p => {
    // Category match
    const matchCategory = selectedCategory === 'All Items' || p.category === selectedCategory;
    
    // Type match
    const matchType = selectedType === 'all' || p.type === selectedType;

    // Search query match (title, businessName, location, description)
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || (
      p.title.toLowerCase().includes(q) ||
      p.businessName.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );

    return matchCategory && matchType && matchSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Simple Welcome Hero & Callout */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Support Local Creators & Small Businesses</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Discover & Book Directly from Makers.
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Find unique handmade crafts, artisanal goods, home bakers, and professional services. Click <strong>Book Now</strong> on any item to place an order or schedule in 2 clicks.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={onGoToPost}
              className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Your Products to Sell</span>
            </button>
            <div className="text-xs text-slate-400 flex items-center gap-1.5 px-2 py-1">
              <span>✓ Instant Booking on Every Listing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        {/* Search input + Type filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candles, gift hampers, consulting, bakery, or city..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedType === 'all' ? 'bg-white shadow-xs text-indigo-700' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('product')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedType === 'product' ? 'bg-white shadow-xs text-indigo-700' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setSelectedType('service')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedType === 'service' ? 'bg-white shadow-xs text-indigo-700' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Services
              </button>
            </div>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Listing' : 'Listings'}
          {selectedCategory !== 'All Items' && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        <span className="text-xs text-slate-500">
          ⚡ All listings support 1-click Book Now
        </span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">No Listings Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              We couldn't find any products or services matching your search. Be the first to post this item!
            </p>
          </div>
          <button
            onClick={onGoToPost}
            className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post This Product to Sell</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col group"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Type Badge */}
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-sm text-slate-800 shadow-sm">
                  {product.type === 'service' ? '🛠️ Service' : '📦 Product'}
                </span>

                {/* Promotional Badge if any */}
                {product.badge && (
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-600 text-white shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  {/* Business Name & Location */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-indigo-600 truncate max-w-[160px]">
                      {product.businessName}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-0.5 shrink-0">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="truncate max-w-[90px]">{product.location.split(',')[0]}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => onQuickView(product)}
                    className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
                    title={product.title}
                  >
                    {product.title}
                  </h3>

                  {/* Description preview */}
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Rating & Pricing */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-base font-extrabold text-slate-900">
                        ₹{product.price}
                        {product.originalPrice && (
                          <span className="ml-1.5 text-xs line-through text-slate-400 font-normal">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {product.type === 'service' ? 'per appointment' : 'direct price'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-400 font-normal text-[10px]">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* THE PROMINENT BOOK NOW BUTTON ON EVERY CARD */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onBookNow(product)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-600/20 transition-all cursor-pointer"
                      title={`Book ${product.title} Now`}
                    >
                      <Zap className="w-3.5 h-3.5 fill-white text-white" />
                      <span>Book Now</span>
                    </button>

                    <button
                      onClick={() => onQuickView(product)}
                      className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                      title="Quick Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
