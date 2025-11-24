// app/dashboard/productos/types.ts

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

export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'active'>;

export type ProductCategory = 'Construcción' | 'Muñecas' | 'Juegos de Mesa' | 'Deportes' | 'Otros';