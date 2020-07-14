import { SafeUrl } from '@angular/platform-browser';

export interface Product {
  category?: string;
  brand?: string;
  size?: string;
  reviews_rate?: number;
  reviews_count?: number;
  details?: string;

  id?: number;
  total?: number;
  quantity: number;
  index?: string;
  url_image?: string;
  url_images?: string;
  id_hermes?: number;
  name?: string;
  categories?: string;
  ean?: string;
  manufacturer: string;
  count_available: number;
  availability_status: number;
  is_backorder: number;
  is_promotion: number;
  replacers: number;
  catalog_price: number;
  cost: number;
  client_price: number;
  currency: string;
  vat: string;
  vat_reverse: 0;
  client_discount: string;
  weight: 0;
  package: 0;
  measurement_unit: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface Order {
  name: string;
  lastName?: string;
  address: string;
  city: string;
  country: string;
  postIndex: string;
  phone: string;
  email: string;
  cost: number;
  image?: string;
  total: number;
  quantity: number;
  shipping?: string;
  orderInfo?: string;
  paymanet: string;
  orders: Product[];
}
