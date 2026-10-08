import React from 'react';
import { 
  X, 
  MapPin, 
  Star, 
  Phone, 
  ShieldCheck, 
  Zap, 
  MessageSquare, 
  Store,
  Calendar
} from 'lucide-react';
import { ProductItem } from '../types';
import { handleImageError } from '../utils/imageFallback';

interface ProductQuickViewModalProps {
  item: ProductItem | null;
  onClose: () => void;
  onBookNow: (item: ProductItem) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  item,
  onClose,
  onBookNow
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="relative aspect-video sm:aspect-[21/9] bg-slate-100 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-600 text-white inline-block mb-1.5 shadow-sm">
              {item.type === 'service' ? '🛠️ Service / Consultation' : '📦 Handcrafted Product'}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-tight">
              {item.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Business & Pricing row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold">
                <Store className="w-4 h-4 text-indigo-500" />
                <span>{item.businessName}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 font-medium">By {item.sellerName}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.location}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{item.rating} ({item.reviewsCount} reviews)</span>
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-2xl font-black text-slate-900">
                ₹{item.price}{' '}
                {item.originalPrice && (
                  <span className="text-sm font-normal line-through text-slate-400">
                    ₹{item.originalPrice}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold">
                ✓ Free Instant Booking & Direct Seller Contact
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              About This {item.type === 'service' ? 'Service' : 'Product'}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Trust points */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verified Small Business Creator</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Same-day Order Confirmation</span>
            </div>
          </div>

          {/* Action Row: Book Now & WhatsApp Contact */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onBookNow(item);
              }}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-white text-white" />
              <span>Book Now (₹{item.price})</span>
            </button>

            <a
              href={`https://wa.me/${item.sellerPhone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(item.businessName)},%20I'm%20inquiring%20about%20${encodeURIComponent(item.title)}%20on%20BizBridge.`}
              target="_blank"
              rel="noreferrer"
              className="py-3.5 px-5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Contact Seller</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
