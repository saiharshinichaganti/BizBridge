import React, { useState } from 'react';
import { 
  PlusCircle, 
  Sparkles, 
  Store, 
  Tag, 
  IndianRupee, 
  MapPin, 
  Phone, 
  Image as ImageIcon, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Package,
  Wrench
} from 'lucide-react';
import { safeConfetti } from '../utils/confetti';
import { handleImageError } from '../utils/imageFallback';
import { ProductItem, ItemType } from '../types';
import { CATEGORIES } from '../data/initialData';

interface PostProductPageProps {
  onProductCreated: (newProduct: ProductItem) => void;
  onViewMarketplace: () => void;
}

const PRESET_IMAGES = [
  { label: 'Candle & Aroma', url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80' },
  { label: 'Gift Hamper', url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80' },
  { label: 'Handmade Bag', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80' },
  { label: 'Ceramics & Decor', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80' },
  { label: 'Organic Skincare', url: 'https://images.unsplash.com/photo-1608248597359-52b36a19f390?auto=format&fit=crop&w=600&q=80' },
  { label: 'Bakery & Food', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80' },
  { label: 'Service / Tech', url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80' }
];

export const PostProductPage: React.FC<PostProductPageProps> = ({
  onProductCreated,
  onViewMarketplace
}) => {
  const [title, setTitle] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [category, setCategory] = useState(CATEGORIES[1]);
  const [type, setType] = useState<ItemType>('product');
  const [price, setPrice] = useState<number | ''>('');
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [location, setLocation] = useState('Hyderabad, Telangana');
  const [badge, setBadge] = useState('New Launch');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdItem, setCreatedItem] = useState<ProductItem | null>(null);

  // Quick 1-click template loader for fast demo
  const loadDemoTemplate = () => {
    setTitle('Handmade Floral Soy Candle');
    setBusinessName('Yakshitha Craft Studio');
    setSellerName('Yakshitha C.');
    setSellerPhone('+91 98490 12345');
    setCategory('Handmade & Crafts');
    setType('product');
    setPrice(599);
    setOriginalPrice(799);
    setDescription('Aromatic hand-poured soy candle featuring dried rose petals and calming French lavender scent.');
    setImage(PRESET_IMAGES[0].url);
    setLocation('Hyderabad, Telangana');
    setBadge('Artisan Pick');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !businessName || !price) return;

    const finalImage = customImageUrl.trim() || image;

    const newProd: ProductItem = {
      id: `item-${Date.now()}`,
      title,
      businessName,
      sellerName: sellerName || businessName,
      sellerPhone: sellerPhone || '+91 98490 00000',
      category,
      type,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      description: description || 'High quality creation crafted with passion and care.',
      image: finalImage,
      location,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      createdAt: new Date().toISOString().split('T')[0],
      badge: badge.trim() || undefined
    };

    onProductCreated(newProd);
    setCreatedItem(newProd);
    setIsSuccess(true);

    safeConfetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  if (isSuccess && createdItem) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-5">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Your Product is Live & Ready to Sell!
        </h2>
        <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto">
          Buyers across BizBridge can now search, view, and book or order this item with instant <strong>Book Now</strong> buttons.
        </p>

        {/* Live Product Card Preview */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-lg max-w-md mx-auto text-left flex gap-4">
          <img
            src={createdItem.image}
            alt={createdItem.title}
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className="w-24 h-24 rounded-xl object-cover bg-slate-100 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <span className="text-xs font-semibold text-indigo-600">{createdItem.businessName}</span>
            <h4 className="text-base font-bold text-slate-900 truncate mt-0.5">{createdItem.title}</h4>
            <div className="text-slate-500 text-xs mt-0.5">{createdItem.location}</div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-lg font-black text-slate-900">₹{createdItem.price}</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white">
                Book Now Ready ✓
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={onViewMarketplace}
            className="py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View in Marketplace & Test Book Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setIsSuccess(false);
              setTitle('');
              setPrice('');
              setDescription('');
            }}
            className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition-all cursor-pointer"
          >
            Post Another Product
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Top Banner / Explainer */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden mb-8">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sell Online Easily</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Post Your Business Products & Services
          </h1>
          <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-xl">
            List whatever you make or offer. BizBridge automatically equips your listing with a 1-click <strong>"Book Now"</strong> button so customers can order or book directly!
          </p>

          <button
            type="button"
            onClick={loadDemoTemplate}
            className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
          >
            <span>⚡ Click here to 1-Click Auto-Fill Sample Product</span>
          </button>
        </div>
      </div>

      {/* Main Posting Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Step 1: Type Selection (Physical Product vs Service) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            1. What Are You Selling?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setType('product')}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                type === 'product'
                  ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20 text-indigo-950'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <Package className={`w-5 h-5 shrink-0 ${type === 'product' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <div>
                <div className="font-bold text-sm">Physical Product</div>
                <div className="text-xs text-slate-500 mt-0.5">Handmade crafts, bakes, apparel, gifts to deliver</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setType('service')}
              className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                type === 'service'
                  ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20 text-indigo-950'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <Wrench className={`w-5 h-5 shrink-0 ${type === 'service' ? 'text-indigo-600' : 'text-slate-400'}`} />
              <div>
                <div className="font-bold text-sm">Service / Consultation</div>
                <div className="text-xs text-slate-500 mt-0.5">Repairs, design, bookings, tutoring, workshops</div>
              </div>
            </button>
          </div>
        </div>

        {/* Step 2: Product Name & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span>{type === 'product' ? 'Product Name' : 'Service Title'} *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Scented Soy Candle, Custom Photo Hamper"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Category *
            </label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium bg-white"
            >
              {CATEGORIES.filter(c => c !== 'All Items').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 3: Business Name & Seller Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Store className="w-3.5 h-3.5 text-slate-400" />
              <span>Business / Brand Name *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Yakshitha Handmade Studio"
              value={businessName}
              onChange={e => setBusinessName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Seller / Owner Name
            </label>
            <input
              type="text"
              placeholder="e.g. Yakshitha C."
              value={sellerName}
              onChange={e => setSellerName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>WhatsApp / Contact *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. +91 98490 12345"
              value={sellerPhone}
              onChange={e => setSellerPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
        </div>

        {/* Step 4: Price & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
              <span>Selling Price (₹ INR) *</span>
            </label>
            <input
              type="number"
              required
              min={1}
              placeholder="e.g. 599"
              value={price}
              onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Original Price (Optional)
            </label>
            <input
              type="number"
              min={1}
              placeholder="e.g. 799"
              value={originalPrice}
              onChange={e => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>City / Service Area *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Hyderabad, Telangana"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
        </div>

        {/* Step 5: Photo Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
            <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
            <span>Select a Photo Preset or Provide Your Image URL</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {PRESET_IMAGES.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setImage(p.url);
                  setCustomImageUrl('');
                }}
                className={`relative rounded-xl overflow-hidden border p-1 text-left transition-all cursor-pointer ${
                  image === p.url && !customImageUrl
                    ? 'border-indigo-600 ring-2 ring-indigo-500/30'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <img src={p.url} alt={p.label} className="w-full h-16 object-cover rounded-lg" />
                <span className="block text-[11px] font-semibold text-slate-700 mt-1 truncate">
                  {p.label}
                </span>
              </button>
            ))}
          </div>

          <input
            type="url"
            placeholder="Or paste any custom image URL (e.g. https://...)"
            value={customImageUrl}
            onChange={e => setCustomImageUrl(e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Step 6: Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Description & Details</span>
          </label>
          <textarea
            rows={3}
            placeholder="Tell customers what makes this product special, materials used, burn time, delivery details, etc."
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Publish & Put On Sale (With Instant Book Now Button)</span>
        </button>
      </form>
    </div>
  );
};
