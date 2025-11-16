'use client';

// ✨ FUSIONANDO TUS ARCHIVOS (TYPES Y HOOK) AQUÍ DENTRO
import { useState, useMemo, useEffect } from 'react';

// --- Tus Tipos (de types.ts) ---
export interface Product {
  id: string; // Usaremos string como en tu tipo
  code: string;
  name: string;
  description: string;
  category: string; // Por ahora string, luego lo conectamos a CategoriaData
  supplier: string; // Por ahora string, luego lo conectamos a MarcaData
  currentStock: number;
  minStock: number;
  majorPrice: number; // Precio Mayorista
  minorPrice: number; // Precio Minorista (El que mostraremos en la tarjeta)
  active: boolean;
  imagenUrl?: string; // ✨ AÑADIDO: campo para la imagen (opcional)
}

// Tipo para el formulario del modal
export type ProductFormData = Omit<Product, 'id' | 'active'>;

// --- Tus Datos Mock (Asumiré esta ruta, ajústala si es necesario) ---
const mockProducts: Product[] = [
  { 
    id: '1', code: 'JUG001', name: 'Carro de Control Remoto', description: 'Rojo, 4x4',
    category: 'Deportes', supplier: 'Genérico', currentStock: 3, minStock: 5,
    majorPrice: 150, minorPrice: 180, active: true,
    imagenUrl: 'https://placehold.co/400x300/ef4444/white?text=Carro+RC'
  },
  { 
    id: '2', code: 'JUG002', name: 'Muñeca Barbie', description: 'Edición especial',
    category: 'Muñecas', supplier: 'Mattel', currentStock: 15, minStock: 5,
    majorPrice: 120, minorPrice: 150, active: true,
    imagenUrl: 'https://placehold.co/400x300/ec4899/white?text=Barbie'
  },
  { 
    id: '3', code: 'JUG003', name: 'Lego City', description: 'Estación de policía',
    category: 'Construcción', supplier: 'Lego', currentStock: 2, minStock: 8,
    majorPrice: 200, minorPrice: 250, active: true,
    imagenUrl: 'https://placehold.co/400x300/3b82f6/white?text=Lego+City'
  },
];

// --- Tu Hook (de useProducts.ts) ---
const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showLowStock, setShowLowStock] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !categoryFilter || product.category === categoryFilter;
      
      const matchesStock = !showLowStock || product.currentStock < product.minStock;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchTerm, categoryFilter, showLowStock]);

  const deleteProduct = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const saveProduct = (productData: Product) => {
    const isEditing = products.some(p => p.id === productData.id);
    if (isEditing) {
      setProducts(prev =>
        prev.map(p => (p.id === productData.id ? productData : p))
      );
    } else {
      const newProduct = { ...productData, id: Date.now().toString(), active: true, imagenUrl: productData.imagenUrl || `https://placehold.co/400x300/cccccc/white?text=${productData.name.replace(' ', '+')}` };
      setProducts(prev => [newProduct, ...prev]);
    }
  };

  const categories = useMemo(() => {
    const catSet = new Set(products.map(p => p.category));
    return Array.from(catSet);
  }, [products]);

  return {
    products: filteredProducts,
    categories,
    setSearchTerm,
    setCategoryFilter,
    setShowLowStock,
    deleteProduct,
    saveProduct,
    searchTerm,
    categoryFilter,
    showLowStock
  };
};

// --- Componente Modal (Actualizado a tu tipo 'Product') ---
type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Product) => void;
  productoEditar?: Product | null;
};

function ProductModal({ isOpen, onClose, onSave, productoEditar }: ProductModalProps) {
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'active'>>({
    code: '', name: '', description: '', category: '', supplier: '',
    currentStock: 0, minStock: 0, majorPrice: 0, minorPrice: 0, imagenUrl: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (productoEditar) {
        setFormData(productoEditar);
      } else {
        setFormData({
          code: '', name: '', description: '', category: '', supplier: '',
          currentStock: 0, minStock: 0, majorPrice: 0, minorPrice: 0, imagenUrl: ''
        });
      }
    }
  }, [isOpen, productoEditar]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: productoEditar?.id || '',
      active: productoEditar?.active || true,
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const processedValue = type === 'number' ? Number(value) : value;
    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {productoEditar ? 'Editar Producto' : 'Nuevo Producto'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna Izquierda */}
          <div className="space-y-4">
            <input type="text" required name="name" value={formData.name} onChange={handleChange} placeholder="Nombre del Producto *" className="w-full px-4 py-2 border rounded-lg" />
            <input type="text" required name="code" value={formData.code} onChange={handleChange} placeholder="Código (SKU) *" className="w-full px-4 py-2 border rounded-lg" />
            <textarea name="description" value={formData.description} onChange={handleChange} rows={2} placeholder="Descripción" className="w-full px-4 py-2 border rounded-lg resize-none" />
            <input type="url" name="imagenUrl" value={formData.imagenUrl} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" className="w-full px-4 py-2 border rounded-lg" />
          </div>
          
          {/* Columna Derecha */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="number" required name="currentStock" value={formData.currentStock} onChange={handleChange} placeholder="Stock Actual *" className="w-full px-4 py-2 border rounded-lg" />
              <input type="number" required name="minStock" value={formData.minStock} onChange={handleChange} placeholder="Stock Mínimo *" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="number" name="majorPrice" value={formData.majorPrice} onChange={handleChange} placeholder="Precio Mayorista" className="w-full px-4 py-2 border rounded-lg" />
              <input type="number" required name="minorPrice" value={formData.minorPrice} onChange={handleChange} placeholder="Precio Minorista *" className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <input type="text" required name="category" value={formData.category} onChange={handleChange} placeholder="Categoría *" className="w-full px-4 py-2 border rounded-lg" />
            <input type="text" required name="supplier" value={formData.supplier} onChange={handleChange} placeholder="Marca/Proveedor *" className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-4 mt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">Guardar Producto</button>
          </div>
        </form>
      </div>
    </div>
  );
}


// --- La Página Principal (Default Export) ---
export default function ProductosPage() {
  
  const {
    products, categories,
    setSearchTerm, setCategoryFilter, setShowLowStock,
    deleteProduct, saveProduct,
    searchTerm, categoryFilter, showLowStock
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoParaEditar, setProductoParaEditar] = useState<Product | null>(null);

  const handleAbrirCrear = () => {
    setProductoParaEditar(null);
    setIsModalOpen(true);
  };

  const handleAbrirEditar = (producto: Product) => {
    setProductoParaEditar(producto);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Productos</h1>
            <p className="text-gray-500 text-sm mt-1">Catálogo visible: {products.length} productos</p>
          </div>
          <button onClick={handleAbrirCrear} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            <span>Nuevo Producto</span>
          </button>
        </div>

        {/* Filtros Conectados */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center">
          <input type="text" placeholder="Buscar por nombre o código..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            <option value="">Todas las categorías</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showLowStock} onChange={(e) => setShowLowStock(e.target.checked)} className="rounded text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-gray-700">Ver solo Stock Bajo</span>
          </label>
        </div>

        {/* --- ✨ LISTA DE PRODUCTOS (DISEÑO MEJORADO) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => (
            <div key={prod.id} className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-lg">
              
              {/* 1. Imagen y Badge de Stock */}
              <div className="relative">
                <div className="w-full h-48 bg-gray-200"> {/* Contenedor de imagen */}
                  <img 
                    src={prod.imagenUrl || 'https://placehold.co/400x300/e2e8f0/94a3b8?text=Sin+Imagen'}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/e2e8f0/94a3b8?text=Error'; }}
                  />
                </div>
                <span className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full text-white ${
                  prod.currentStock > prod.minStock ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {prod.currentStock > prod.minStock ? 'En Stock' : 'Stock Bajo'}
                </span>
              </div>

              {/* 2. Cuerpo de la tarjeta */}
              <div className="p-4 flex flex-col flex-1">
                {/* Categoría y Marca (sutil) */}
                <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M5 11v2m14-2v2" /></svg>
                    {prod.category}
                  </span>
                  <span className="font-medium">{prod.supplier}</span>
                </div>
                
                {/* Nombre del Producto */}
                <h3 className="text-lg font-bold text-gray-800 truncate mb-3" title={prod.name}>
                  {prod.name}
                </h3>
                
                {/* Stock (con icono) */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a2 2 0 00-2 2h18a2 2 0 00-2-2L21 7l-3-1M6 7l3 9M18 7l-3 9" /></svg>
                  <span>{prod.currentStock} uds.</span>
                  <span className="text-gray-400">|</span>
                  <span>Min: {prod.minStock} uds.</span>
                </div>

                {/* 3. Footer de la tarjeta (Precio y Acciones) */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <p className="text-xl font-extrabold text-blue-600">
                    Bs. {prod.minorPrice}
                  </p>
                  <div className="flex gap-2">
                    <button onClick={() => handleAbrirEditar(prod)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" /></svg>
                    </button>
                    <button onClick={() => deleteProduct(prod.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>
        
        {/* Si no hay productos (visual) */}
        {products.length === 0 && (
          <div className="text-center p-12 bg-white rounded-xl border border-gray-200">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron productos</h3>
            <p className="mt-1 text-sm text-gray-500">Intenta ajustar tu búsqueda o crea un nuevo producto.</p>
          </div>
        )}

      </div>

      <ProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveProduct}
        productoEditar={productoParaEditar}
      />
    </>
  );
}