'use client';

import { useState } from 'react';
import BrandModal, { MarcaData, MarcaSaveData } from '../components/BrandModal'; 

// Tipo de dato para la Página
type Marca = {
  id: number;
  nombre: string;
  descripcion: string;
  estado: 'Activo' | 'Inactivo' | string;
  productosCount: number;
};

// Datos falsos para probar Marcas
const DUMMY_MARCAS: Marca[] = [
  { id: 1, nombre: 'Lego', descripcion: 'Proveedor oficial Dinamarca', estado: 'Activo', productosCount: 45 },
  { id: 2, nombre: 'Mattel', descripcion: 'Barbies y Hot Wheels', estado: 'Activo', productosCount: 32 },
  { id: 3, nombre: 'Hasbro', descripcion: 'Juegos de mesa y figuras', estado: 'Activo', productosCount: 28 },
  { id: 4, nombre: 'Fisher-Price', descripcion: 'Juguetes para bebés', estado: 'Inactivo', productosCount: 0 },
];

export default function MarcasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [marcas, setMarcas] = useState<Marca[]>(DUMMY_MARCAS);
  const [marcaParaEditar, setMarcaParaEditar] = useState<Marca | null>(null);

  const handleSaveMarca = (data: MarcaSaveData) => {
    if (data.id) {
      // Editar
      setMarcas(prev => prev.map(m => m.id === data.id ? { ...m, ...data, productosCount: m.productosCount } : m));
    } else {
      // Crear
      const nuevaMarca: Marca = {
        id: Date.now(),
        nombre: data.nombre,
        descripcion: data.descripcion,
        estado: data.estado,
        productosCount: 0,
      };
      setMarcas([nuevaMarca, ...marcas]);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta marca?')) {
      setMarcas(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleAbrirCrear = () => {
    setMarcaParaEditar(null);
    setIsModalOpen(true);
  };

  const handleAbrirEditar = (marca: Marca) => {
    setMarcaParaEditar(marca);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Marcas y Proveedores</h1>
          <p className="text-gray-500 text-sm mt-1">Gestiona las marcas de juguetes disponibles</p>
        </div>
        <button onClick={handleAbrirCrear} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          <span>Nueva Marca</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50">
           <input type="text" placeholder="Buscar marca..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white outline-none focus:ring-1 focus:ring-blue-500" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productos</th>
                <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {marcas.map((marca) => (
                <tr key={marca.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-semibold text-gray-900">{marca.nombre}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-500 truncate max-w-xs">{marca.descripcion}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${marca.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {marca.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{marca.productosCount} items</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleAbrirEditar(marca)} className="text-blue-600 hover:text-blue-900 mr-4">Editar</button>
                    <button onClick={() => handleDelete(marca.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <BrandModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveMarca} marcaEditar={marcaParaEditar} />
    </div>
  );
}