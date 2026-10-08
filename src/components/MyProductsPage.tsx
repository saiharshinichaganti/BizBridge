import React from 'react';
import { PlusCircle, Package, MapPin, Trash2, Eye, Zap, IndianRupee } from 'lucide-react';
import { ProductItem } from '../types';
import { handleImageError } from '../utils/imageFallback';

interface MyProductsPageProps {
  products: ProductItem[];
  onGoToPost: () => void;
  onBookNow: (item: ProductItem) => void;
  onQuickView: (item: ProductItem) => void;
  onDeleteProduct: (id: string) => void;
}

export const MyProductsPage: React.FC<MyProductsPageProps> = ({
  products,
  onGoToPost,
  onBookNow,
  onQuickView,
  onDeleteProduct
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Manage Posted Products & Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Everything you post here is instantly live across the platform with <strong>Book Now</strong> buttons.
          </p>
        </div>

        <button
          onClick={onGoToPost}
          className="self-start sm:self-auto py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Another Product</span>
        </button>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">No Products Listed Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Start selling your crafts, home goods, or booking services online in just 1 minute!
            </p>
          </div>
          <button
            onClick={onGoToPost}
            className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            Post Your First Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-800 backdrop-blur-sm">
                    {item.type === 'service' ? '🛠️ Service' : '📦 Product'}
                  </span>
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                    Live On Sale
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-indigo-600 font-semibold">
                    <span>{item.businessName}</span>
                    <span className="text-slate-400 text-[11px]">{item.category}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-base font-extrabold text-slate-900">
                      ₹{item.price}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location.split(',')[0]}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons with live Book Now testing */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onBookNow(item)}
                  className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                  title="Test Book Now as customer"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  <span>Book Now</span>
                </button>

                <button
                  onClick={() => onQuickView(item)}
                  className="p-2 rounded-lg border border-slate-200 hover:bg-white text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onDeleteProduct(item.id)}
                  className="p-2 rounded-lg border border-red-200 hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                  title="Remove Listing"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
