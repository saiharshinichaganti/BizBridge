import React from 'react';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ShoppingBag, 
  Phone, 
  ArrowRight,
  MessageSquare,
  Clock
} from 'lucide-react';
import { Booking, ProductItem } from '../types';

interface MyBookingsPageProps {
  bookings: Booking[];
  products: ProductItem[];
  onBookAgain: (item: ProductItem) => void;
  onBrowseMarketplace: () => void;
}

export const MyBookingsPage: React.FC<MyBookingsPageProps> = ({
  bookings,
  products,
  onBookAgain,
  onBrowseMarketplace
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            My Bookings & Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track confirmed appointments and orders placed with local small businesses.
          </p>
        </div>

        <button
          onClick={onBrowseMarketplace}
          className="self-start sm:self-auto py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>Find More to Book</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">No Bookings Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Browse our small businesses, handmade crafts, or services and click <strong>Book Now</strong> to place your first booking!
            </p>
          </div>
          <button
            onClick={onBrowseMarketplace}
            className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            Browse Products & Book Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => {
            const matchedProduct = products.find(p => p.id === booking.productId);

            return (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-mono font-bold">
                      {booking.id}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{booking.status}</span>
                    </span>
                  </div>

                  <span className="text-xs text-slate-400">
                    Booked on {booking.createdAt}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-indigo-600">
                      {booking.businessName}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      {booking.productTitle}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Date: <strong>{booking.bookingDate}</strong></span>
                      </span>

                      {booking.bookingTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Time: <strong>{booking.bookingTime}</strong></span>
                        </span>
                      )}

                      {booking.addressOrNotes && (
                        <span className="flex items-center gap-1 truncate max-w-xs">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{booking.addressOrNotes}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-lg font-extrabold text-slate-900">
                      ₹{booking.totalAmount}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Qty: {booking.quantity}
                    </div>
                  </div>
                </div>

                {/* Footer action buttons */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs text-slate-500">
                    Customer: <strong className="text-slate-700">{booking.customerName}</strong> ({booking.customerPhone})
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${booking.sellerPhone.replace(/[^0-9]/g, '')}?text=Hi,%20I'm%20inquiring%20about%20booking%20${booking.id}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Message Seller</span>
                    </a>

                    {matchedProduct && (
                      <button
                        onClick={() => onBookAgain(matchedProduct)}
                        className="py-1.5 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        ⚡ Book Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
