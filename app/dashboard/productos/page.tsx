'use client';

import { useState } from 'react';
import ProductList from './components/ProductList';
import ProductModal from './components/ProductModal';
import { useProducts } from './hooks/useProducts'; 
import { Product } from './types';

export default function ProductosPage() {
  const {
    products,
    filteredCount,
    filters,
    setSearchTerm,
    setCategoryFilter,
    setShowLowStock,
    deleteProduct,
    saveProduct
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenModal = (product?: Product) => {
    setSelectedProduct(product || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = (productData: Product) => {
    saveProduct(productData); 
    handleCloseModal();
  };

  return (
    <div className="flex flex-col gap-6">
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Productos</h1>
            <p className="text-gray-600">
              Catálogo visible: <strong>{filteredCount}</strong> productos
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            + Nuevo Producto
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={filters.searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <select
          value={filters.categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Todas las categorías</option>
          <option value="Juguetes">Juguetes</option>
          <option value="Muñecas">Muñecas</option>
          
        </select>
        <label className="flex items-center gap-2 px-4 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="checkbox"
            checked={filters.showLowStock}
            onChange={(e) => setShowLowStock(e.target.checked)}
          />
          <span className="text-sm">Ver solo Stock Bajo</span>
        </label>
      </div>

      <ProductList
        products={products}
        onEdit={handleOpenModal}
        onDelete={deleteProduct}
      />

      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}