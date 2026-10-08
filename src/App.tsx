import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BrowseMarketplace } from './components/BrowseMarketplace';
import { PostProductPage } from './components/PostProductPage';
import { MyBookingsPage } from './components/MyBookingsPage';
import { MyProductsPage } from './components/MyProductsPage';
import { BookNowModal } from './components/BookNowModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { Footer } from './components/Footer';
import { ProductItem, Booking } from './types';
import { INITIAL_PRODUCTS } from './data/initialData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'browse' | 'post' | 'bookings' | 'my-shop'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Persisted Products in localStorage
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem('bizbridge_products_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    return INITIAL_PRODUCTS;
  });

  // Persisted Bookings in localStorage
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('bizbridge_bookings_v2');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'BK-591823',
        productId: 'item-1',
        productTitle: 'Aromatherapy Lavender Soy Wax Candle',
        businessName: 'Yakshitha Handmade Studio',
        sellerPhone: '+91 98490 12345',
        itemType: 'product',
        price: 649,
        customerName: 'Harshini C.',
        customerPhone: '+91 98490 00000',
        addressOrNotes: 'Flat 402, Green Meadows, Jubilee Hills, Hyderabad',
        bookingDate: '2026-09-29',
        quantity: 1,
        totalAmount: 649,
        status: 'Confirmed',
        createdAt: 'Sep 27, 2026'
      }
    ];
  });

  // Active Modals
  const [bookingModalItem, setBookingModalItem] = useState<ProductItem | null>(null);
  const [quickViewItem, setQuickViewItem] = useState<ProductItem | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bizbridge_products_v2', JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('bizbridge_bookings_v2', JSON.stringify(bookings));
    } catch {}
  }, [bookings]);

  const handleProductCreated = (newProduct: ProductItem) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-indigo-600 selection:text-white">
      <div>
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          bookingsCount={bookings.length}
          productsCount={products.length}
        />

        {/* Global Quick-Action Bar */}
        <div className="bg-indigo-900 text-white text-xs py-2 px-4 text-center font-medium border-b border-indigo-950 flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-500/40 text-[10px] font-bold uppercase tracking-wider">
            Simple & Fast
          </span>
          <span>
            Every product has an instant <strong>Book Now</strong> button. Want to sell? Click{' '}
            <button
              onClick={() => setActiveTab('post')}
              className="underline font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
            >
              Post to Sell
            </button>{' '}
            to list your items in 1 minute!
          </span>
        </div>

        {/* Dynamic Views */}
        <main className="min-h-[70vh]">
          {activeTab === 'browse' && (
            <BrowseMarketplace
              products={products}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onBookNow={item => setBookingModalItem(item)}
              onQuickView={item => setQuickViewItem(item)}
              onGoToPost={() => setActiveTab('post')}
            />
          )}

          {activeTab === 'post' && (
            <PostProductPage
              onProductCreated={handleProductCreated}
              onViewMarketplace={() => setActiveTab('browse')}
            />
          )}

          {activeTab === 'bookings' && (
            <MyBookingsPage
              bookings={bookings}
              products={products}
              onBookAgain={item => setBookingModalItem(item)}
              onBrowseMarketplace={() => setActiveTab('browse')}
            />
          )}

          {activeTab === 'my-shop' && (
            <MyProductsPage
              products={products}
              onGoToPost={() => setActiveTab('post')}
              onBookNow={item => setBookingModalItem(item)}
              onQuickView={item => setQuickViewItem(item)}
              onDeleteProduct={handleDeleteProduct}
            />
          )}
        </main>
      </div>

      {/* Universal Book Now Modal (Accessible from ANY page, card, or search result) */}
      <BookNowModal
        item={bookingModalItem}
        onClose={() => setBookingModalItem(null)}
        onBookingConfirmed={handleBookingConfirmed}
        onOpenMyBookings={() => setActiveTab('bookings')}
      />

      {/* Quick View Overview Modal with Book Now Button */}
      <ProductQuickViewModal
        item={quickViewItem}
        onClose={() => setQuickViewItem(null)}
        onBookNow={item => {
          setQuickViewItem(null);
          setBookingModalItem(item);
        }}
      />

      {/* Footer */}
      <Footer
        onGoToPost={() => setActiveTab('post')}
        onGoToBrowse={() => setActiveTab('browse')}
      />
    </div>
  );
}
