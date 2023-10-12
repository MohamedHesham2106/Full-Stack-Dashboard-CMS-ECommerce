export interface Store {
  id: string;
  name: string;
}
export interface Billboard {
  id: string;
  label: string;
  storeId: string;
  imageUrl: string;
}

export interface Categories {
  id: string;
  name: string;
  billboard: Billboard;
  createdAt: string;
}
export interface Size {
  id: string;
  name: string;
  storeId: string;
  createdAt: string;
  value: string;
}
export interface Color {
  id: string;
  name: string;
  storeId: string;
  createdAt: string;
  value: string;
}
export interface Product {
  id: string;
  name: string;
  isFeatured: boolean;
  isArchived: boolean;
  price: number;
  category: Categories;
  size: Size;
  color: Color;
  createdAt: string;
}
export interface Image {
  id: string;
  url: string;
}
export interface Order {
  id: string;
  storeId: string;
  isPaid: boolean;
  phone: string;
  orderItems: OrderItem[];
  address: string;
  createdAt: string;
}
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
}
