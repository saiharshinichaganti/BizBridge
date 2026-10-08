import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Phone, User, CheckCircle2, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { safeConfetti } from '../utils/confetti';
import { handleImageError } from '../utils/imageFallback';
import { ProductItem, Booking } from '../types';

interface BookNowModalProps {
  item: ProductItem | null;
  onClose: () => void;
  onBookingConfirmed: (booking: Booking) => void;
  onOpenMyBookings: () => void;
}

export const BookNowModal: React.FC<BookNowModalProps> = ({
  item,
  onClose,
  onBookingConfirmed,
  onOpenMyBookings
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [addressOrNotes, setAddressOrNotes] = useState('');
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [bookingTime, setBookingTime] = useState('11:00 AM');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const totalAmount = item.price * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      return;
    }

    const newBooking: Booking = {
      id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      productId: item.id,
      productTitle: item.title,
      businessName: item.businessName,
      sellerPhone: item.sellerPhone,
      itemType: item.type,
      price: item.price,
      customerName,
      customerPhone,
      addressOrNotes,
      bookingDate,
      bookingTime: item.type === 'service' ? bookingTime : undefined,
      quantity,
      totalAmount,
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };

    safeConfetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    onBookingConfirmed(newBooking);
    setConfirmedBooking(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 transition-all animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white p-5 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-1">
              ⚡ Instant {item.type === 'service' ? 'Service Booking' : 'Direct Order'}
            </div>
            <h3 className="text-lg font-bold">
              {item.type === 'service' ? 'Book Appointment' : 'Order This Product'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedBooking ? (
          /* Confirmation State */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900">
                Booking Confirmed!
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                Your request has been placed with <strong className="text-slate-800">{item.businessName}</strong>.
              </p>
              <div className="mt-2 inline-block px-3 py-1 bg-slate-100 rounded-lg text-xs font-mono font-bold text-indigo-700 border border-slate-200">
                Booking ID: {confirmedBooking.id}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Item:</span>
                <span className="font-semibold text-slate-800">{confirmedBooking.productTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Amount:</span>
                <span className="font-bold text-emerald-600 text-sm">₹{confirmedBooking.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date:</span>
                <span className="font-medium text-slate-700">{confirmedBooking.bookingDate} {confirmedBooking.bookingTime ? `at ${confirmedBooking.bookingTime}` : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Customer:</span>
                <span className="font-medium text-slate-700">{confirmedBooking.customerName} ({confirmedBooking.customerPhone})</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <a
                href={`https://wa.me/${item.sellerPhone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(item.businessName)},%20I%20just%20placed%20booking%20${confirmedBooking.id}%20for%20${encodeURIComponent(item.title)}%20on%20BizBridge.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onOpenMyBookings();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <span>View My Bookings</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
            {/* Item summary card */}
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="w-14 h-14 rounded-lg object-cover bg-slate-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-indigo-600 font-semibold">{item.businessName}</div>
                <h4 className="text-sm font-bold text-slate-900 truncate">{item.title}</h4>
                <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                  ₹{item.price}{' '}
                  {item.originalPrice && (
                    <span className="text-xs line-through text-slate-400 font-normal">
                      ₹{item.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity (for products) */}
            {item.type === 'product' && (
              <div className="flex items-center justify-between py-1">
                <span className="text-xs font-semibold text-slate-700">Quantity</span>
                <div className="flex items-center gap-3 border border-slate-200 rounded-lg p-1 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-slate-900 px-1">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Inputs: Customer Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Your Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Phone / WhatsApp *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9849012345"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Service: Date & Time Picker */}
            {item.type === 'service' ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Booking Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={e => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Preferred Time</span>
                  </label>
                  <select
                    value={bookingTime}
                    onChange={e => setBookingTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>02:00 PM</option>
                    <option>04:00 PM</option>
                    <option>06:00 PM</option>
                  </select>
                </div>
              </div>
            ) : (
              /* Product: Delivery Address */
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Delivery Address / Landmark *</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House/Flat number, Street name, City and Pincode..."
                  value={addressOrNotes}
                  onChange={e => setAddressOrNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {/* Service instructions note */}
            {item.type === 'service' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Special Notes or Requirements (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Looking for help with eco packaging branding"
                  value={addressOrNotes}
                  onChange={e => setAddressOrNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {/* Pricing Total & Safety */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Unit Price</span>
                <span>₹{item.price} {quantity > 1 ? `× ${quantity}` : ''}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Platform Convenience Fee</span>
                <span className="text-emerald-600 font-bold">FREE (₹0)</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-900 pt-1 border-t border-slate-100">
                <span>Total Payable</span>
                <span className="text-indigo-600 text-base">₹{totalAmount}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-xl text-emerald-800 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Direct seller connection. Pay upon delivery or service completion.</span>
            </div>

            {/* Book Now Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-600/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm & Book Now (₹{totalAmount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
