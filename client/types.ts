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
  id: number;
  name: string;
  billboard: Billboard;
  createdAt: string;
}
export interface Size {
  id: number;
  name: string;
  storeId: string;
  createdAt: string;
  value: string;
}
export interface Color {
  id: number;
  name: string;
  storeId: string;
  createdAt: string;
  value: string;
}
