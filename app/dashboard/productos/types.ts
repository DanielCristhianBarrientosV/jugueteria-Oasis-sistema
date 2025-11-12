
export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  supplier: string;
  currentStock: number;
  minStock: number;
  majorPrice: number;
  minorPrice: number;
  ageRange: string;
  isNew: boolean;
  isOffer: boolean;
  active: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Un tipo utilitario para cuando creamos uno nuevo (sin ID ni fechas)
export type ProductFormData = Omit<Product, 'id' | 'active' | 'createdAt' | 'updatedAt'>;