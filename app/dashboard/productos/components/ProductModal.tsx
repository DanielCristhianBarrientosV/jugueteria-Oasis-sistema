'use client';

import { useState, useEffect } from 'react';

// Tipos de datos
export type ProductData = {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
  categoriaId: string; // Guardamos el ID, no el nombre
  marcaId: string;     // Guardamos el ID, no el nombre
  imagenUrl: string;
};

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProductData) => void;
  productoEditar?: ProductData | null;
};

// --- DATOS DUMMY PARA LOS DROPDOWNS (Simulamos la BD) ---
const CATEGORIAS_DISPONIBLES = [
  { id: '1', nombre: 'Juguetes de Construcción' },
  { id: '2', nombre: 'Muñecas' },
  { id: '3', nombre: 'Juegos de Mesa' },
];

const MARCAS_DISPONIBLES = [
  { id: '1', nombre: 'Lego' },
  { id: '2', nombre: 'Mattel' },
  { id: '3', nombre: 'Hasbro' },
];

export default function ProductModal({ isOpen, onClose, onSave, productoEditar }: ProductModalProps) {
  // Estados del formulario
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(''); // Usamos string para inputs numéricos y luego convertimos
  const [stock, setStock] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [marcaId, setMarcaId] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (productoEditar) {
        // Modo Edición
        setNombre(productoEditar.nombre);
        setPrecio(productoEditar.precio.toString());
        setStock(productoEditar.stock.toString());
        setCategoriaId(productoEditar.categoriaId);
        setMarcaId(productoEditar.marcaId);
        setImagenUrl(productoEditar.imagenUrl);
      } else {
        // Modo Creación (Reset)
        setNombre('');
        setPrecio('');
        setStock('');
        setCategoriaId('');
        setMarcaId('');
        setImagenUrl('');
      }
    }
  }, [isOpen, productoEditar]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: productoEditar?.id,
      nombre,
      precio: Number(precio), // Convertir a número
      stock: Number(stock),   // Convertir a número
      categoriaId,
      marcaId,
      imagenUrl
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"> {/* Modal más ancho (max-w-2xl) */}
        
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {productoEditar ? 'Editar Producto' : 'Nuevo Producto'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Columna Izquierda: Datos Básicos */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto *</label>
              <input 
                type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej: Lego City Policia"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio (Bs) *</label>
                <input 
                  type="number" required min="0" step="0.50" value={precio} onChange={(e) => setPrecio(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Inicial *</label>
                <input 
                  type="number" required min="0" value={stock} onChange={(e) => setStock(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="0"
                />
              </div>
            </div>

             {/* ✨ APRENDIZAJE: Input Select (Dropdown) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
              <select 
                required 
                value={categoriaId} 
                onChange={(e) => setCategoriaId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="">Selecciona una categoría</option>
                {CATEGORIAS_DISPONIBLES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marca *</label>
              <select 
                required 
                value={marcaId} 
                onChange={(e) => setMarcaId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="">Selecciona una marca</option>
                {MARCAS_DISPONIBLES.map(marca => (
                  <option key={marca.id} value={marca.id}>{marca.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Columna Derecha: Imagen y Preview */}
          <div className="space-y-4 flex flex-col">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
              <input 
                type="url" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">Copia la dirección de una imagen de Google para probar.</p>
            </div>

            {/* Preview de Imagen */}
            <div className="flex-1 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 overflow-hidden relative min-h-[150px]">
              {imagenUrl ? (
                <img src={imagenUrl} alt="Preview" className="w-full h-full object-cover absolute inset-0" />
              ) : (
                <div className="text-center p-4">
                  <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-500">Vista previa</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer (ocupa las 2 columnas) */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-4 mt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
              Guardar Producto
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}