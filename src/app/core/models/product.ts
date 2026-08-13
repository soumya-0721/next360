export interface Product {
  slug: string;
  name: string;
  category: string;
  categoryName: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  organic: boolean;
  inStock: boolean;
  badge?: string;
  isNew?: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  description: string;
  benefits: string[];
  ingredients: string;
  usage: string;
  shipping: string;
}

export interface Category {
  slug: string;
  name: string;
  image: string;
  description: string;
}

export interface Review {
  name: string;
  text: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  payment: string;
  total: number;
  placedAt: string;
}
