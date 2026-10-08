import React from 'react';
import { Sparkles, ShieldCheck, Zap, Heart, MessageSquare } from 'lucide-react';

interface FooterProps {
  onGoToPost: () => void;
  onGoToBrowse: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onGoToPost, onGoToBrowse }) => {
  return (
    <footer className="bg-slate-900 text-white mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">BizBridge</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The easiest way to post your small business products, sell online, and let customers book services or buy items instantly with Book Now buttons on every page.
            </p>
          </div>

          {/* Core Values */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Why Sellers & Buyers Love BizBridge
            </h4>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Instant <strong>Book Now</strong> button on every product</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct WhatsApp & phone contact with makers</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Zero upfront listing fees for small business owners</span>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Quick Actions
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={onGoToPost}
                className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl text-left transition-colors cursor-pointer"
              >
                ➕ Post a Product / Service to Sell
              </button>
              <button
                onClick={onGoToBrowse}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl text-left transition-colors cursor-pointer"
              >
                🛍️ Browse All Products & Book Now
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>© 2026 BizBridge. Built for local makers, creators, and smart buyers.</span>
          <span>Simple, fast, and transparent commerce.</span>
        </div>
      </div>
    </footer>
  );
};
