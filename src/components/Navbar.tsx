import React from 'react';
import { 
  ShoppingBag, 
  PlusCircle, 
  CalendarCheck, 
  Store, 
  Search,
  Sparkles,
  Zap
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'browse' | 'post' | 'bookings' | 'my-shop';
  setActiveTab: (tab: 'browse' | 'post' | 'bookings' | 'my-shop') => void;
  bookingsCount: number;
  productsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bookingsCount,
  productsCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => setActiveTab('browse')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                  BizBridge
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Easy
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Post Products & Book Instantly
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            
            {/* Browse & Search */}
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'browse'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse & Book</span>
            </button>

            {/* Post Product To Sell (Highlight) */}
            <button
              onClick={() => setActiveTab('post')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'post'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-500/20'
                  : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post to Sell</span>
            </button>

            {/* My Bookings */}
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'bookings'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span className="hidden md:inline">My Bookings</span>
              {bookingsCount > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeTab === 'bookings' ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white'
                }`}>
                  {bookingsCount}
                </span>
              )}
            </button>

            {/* My Shop / Posted Items */}
            <button
              onClick={() => setActiveTab('my-shop')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'my-shop'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Store className="w-4 h-4" />
              <span className="hidden md:inline">My Shop</span>
              <span className="text-[10px] opacity-70">({productsCount})</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
