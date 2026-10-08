export type ItemType = 'product' | 'service';

export interface ProductItem {
  id: string;
  title: string;
  businessName: string;
  sellerName: string;
  sellerPhone: string;
  category: string;
  type: ItemType;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  location: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  createdAt: string;
  badge?: string;
}

export interface Booking {
  id: string;
  productId: string;
  productTitle: string;
  businessName: string;
  sellerPhone: string;
  itemType: ItemType;
  price: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  addressOrNotes: string;
  bookingDate: string;
  bookingTime?: string;
  quantity: number;
  totalAmount: number;
  status: 'Confirmed' | 'Preparing' | 'Completed';
  createdAt: string;
}
