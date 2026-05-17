export interface CakeProduct {
  id: string;
  name: string;
  category: "wedding" | "birthday" | "cupcakes" | "treats" | "celebration" | "luxury";
  price: number;
  image: string;
  description: string;
  bestSeller?: boolean;
  flavors: string[];
  sizes: { label: string; priceModifier: number }[];
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  cartId: string;
  product: CakeProduct;
  selectedFlavor: string;
  selectedSize: { label: string; priceModifier: number };
  quantity: number;
  inscription: string; // e.g., "Happy Birthday" text
  customRequests?: string;
}

export interface CustomOrderRequest {
  clientName: string;
  phone: string;
  eventDate: string;
  eventType: string;
  tiers: string;
  flavor: string;
  frosting: string;
  decorations: string[];
  estimatedBudget: string;
  inscriptionText: string;
  additionalNotes: string;
}

export interface Testimonial {
  id: string;
  name: string;
  eventType: string;
  rating: number;
  review: string;
  date: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "wedding" | "birthday" | "cupcakes" | "treats" | "luxury" | "celebration";
  image: string;
  description: string;
}
