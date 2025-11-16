'use client';

import { useState, useEffect } from 'react';

// Tipos específicos para Marca
export type MarcaData = {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
};

export type MarcaSaveData = {
  id?: number;
  nombre: string;
  descripcion: string;
  estado: string;
};

type BrandModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: MarcaSaveData) => void;
  marcaEditar?: MarcaData | null; // Recibimos una marca, no una categoría
};

export default function BrandModal({ isOpen, onClose, onSave, marcaEditar }: BrandModalProps) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Activo');

  useEffect(() => {
    if (isOpen) {
      if (marcaEditar) {
        setNombre(marcaEditar.nombre);
        setDescripcion(marcaEditar.descripcion);
        setEstado(marcaEditar.estado);
      } else {
        setNombre('');
        setDescripcion('');
        setEstado('Activo');
      }
    }
  }, [isOpen, marcaEditar]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: marcaEditar?.id, nombre, descripcion, estado });
    onClose();
  };

  const isEditMode = !!marcaEditar;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all scale-100">
        
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {isEditMode ? 'Editar Marca' : 'Nueva Marca'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Marca <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Ej: Lego, Mattel, Hasbro..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción / Notas</label>
            <textarea 
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              placeholder="Información del proveedor o detalles..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="estado_marca" 
                  value="Activo" 
                  checked={estado === 'Activo'}
                  onChange={(e) => setEstado(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500" 
                />
                <span className="text-sm text-gray-700">Activo</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="estado_marca" 
                  value="Inactivo" 
                  checked={estado === 'Inactivo'}
                  onChange={(e) => setEstado(e.target.value)}
                  className="text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-700">Inactivo</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              {isEditMode ? 'Guardar Cambios' : 'Guardar Marca'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}