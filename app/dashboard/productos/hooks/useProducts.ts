import { useState, useMemo } from 'react';
import { Product } from '../types';
import { mockProducts } from '@/lib/data/mockProducts';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts as unknown as Product[]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showLowStock, setShowLowStock] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !categoryFilter || product.category === categoryFilter;

      const matchesStock = !showLowStock || product.currentStock < product.minStock;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchTerm, categoryFilter, showLowStock]);

  const deleteProduct = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      return true; // Retorna éxito
    }
    return false;
  };

  const saveProduct = (productData: Product) => {
    const isEditing = products.some(p => p.id === productData.id);

    if (isEditing) {
      setProducts(prev =>
        prev.map(p => (p.id === productData.id ? productData : p))
      );
    } else {
      setProducts(prev => [...prev, productData]);
    }
  };

  return {
    // Data
    products: filteredProducts,
    totalProducts: products.length,
    filteredCount: filteredProducts.length,
    // Filter States
    filters: {
      searchTerm,
      categoryFilter,
      showLowStock
    },
    // Filter Setters
    setSearchTerm,
    setCategoryFilter,
    setShowLowStock,
    // Actions
    deleteProduct,
    saveProduct
  };
};