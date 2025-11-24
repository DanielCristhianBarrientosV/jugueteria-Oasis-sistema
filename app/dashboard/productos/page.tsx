// app/dashboard/productos/page.tsx
"use client";

import { useState, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import { Product, ProductFormData } from "./types";

const mockProducts: Product[] = [
  {
    id: "1",
    code: "RC-4X4",
    name: "Monster Truck 4x4",
    description: "Vehículo todo terreno",
    category: "Deportes",
    supplier: "SpeedToys",
    currentStock: 3,
    minStock: 5,
    majorPrice: 150,
    minorPrice: 280,
    ageRange: "8-12 años",
    isNew: true,
    isOffer: false,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function ProductosPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showLowStock, setShowLowStock] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !categoryFilter || product.category === categoryFilter;
      const matchesStock =
        !showLowStock || product.currentStock <= product.minStock;
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchTerm, categoryFilter, showLowStock]);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSave = (data: ProductFormData) => {
    if (editingProduct) {
      const updatedProduct: Product = {
        ...editingProduct,
        ...data,
        updatedAt: new Date().toISOString(),
      };

      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? updatedProduct : p))
      );
    } else {
      const newProduct: Product = {
        ...data,
        id: Date.now().toString(),
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setProducts((prev) => [newProduct, ...prev]);
    }

    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Gestión de Productos
          </h1>
          <p className="text-slate-500 text-sm">
            Inventario activo: {products.length} items
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm font-medium transition-colors"
        >
          <Plus size={20} />
          <span>Nuevo Producto</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-2.5 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 outline-none"
        >
          <option value="">Todas las Categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 select-none">
          <input
            type="checkbox"
            checked={showLowStock}
            onChange={(e) => setShowLowStock(e.target.checked)}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-slate-600">Stock Bajo</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        productoEditar={editingProduct}
      />
    </div>
  );
}
