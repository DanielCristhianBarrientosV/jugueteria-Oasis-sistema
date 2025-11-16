'use client';

import { useState, useEffect } from 'react';

// ✨ 1. Tipos más claros para la comunicación
// Lo que el modal recibe para editar
export type CategoriaData = {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
};

// Lo que el modal devuelve al guardar (ID es opcional)
export type CategoriaSaveData = {
  id?: number;
  nombre: string;
  descripcion: string;
  estado: string;
};

// ✨ 2. Props actualizadas
type CategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CategoriaSaveData) => void;
  categoriaEditar?: CategoriaData | null; // <-- Nueva prop para modo edición
};

export default function CategoryModal({ isOpen, onClose, onSave, categoriaEditar }: CategoryModalProps) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Activo');

  // ✨ 3. useEffect "inteligente": detecta si es modo Creación o Edición
  useEffect(() => {
    if (isOpen) {
      if (categoriaEditar) {
        // Modo Edición: Rellenar formulario con datos existentes
        setNombre(categoriaEditar.nombre);
        setDescripcion(categoriaEditar.descripcion);
        setEstado(categoriaEditar.estado);
      } else {
        // Modo Creación: Limpiar formulario
        setNombre('');
        setDescripcion('');
        setEstado('Activo');
      }
    }
  }, [isOpen, categoriaEditar]); // Se ejecuta si cambia 'isOpen' o 'categoriaEditar'

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Devolvemos el ID si estábamos editando
    onSave({ 
      id: categoriaEditar?.id, 
      nombre, 
      descripcion, 
      estado 
    });
    
    onClose();
  };

  // ✨ 4. Título y botón dinámicos
  const isEditMode = !!categoriaEditar; // true si 'categoriaEditar' tiene datos

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all scale-100">
        
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {isEditMode ? 'Editar Categoría' : 'Nueva Categoría'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Categoría <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Ej: Juguetes de Madera"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea 
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              placeholder="Breve descripción de la familia de productos..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="estado" 
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
                  name="estado" 
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
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              {isEditMode ? 'Guardar Cambios' : 'Guardar Categoría'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}