'use client';

import { useState, useEffect } from 'react';

// Tipos de datos para el Proveedor
export type ProviderData = {
  id: number;
  razonSocial: string;
  ruc: string; // ID de Impuestos
  direccion: string;
  telefono: string;
  email: string;
  contacto: string; // Persona de contacto
};

export type ProviderSaveData = Omit<ProviderData, 'id'> & { id?: number };

// Props del Modal
type ProviderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProviderSaveData) => void;
  providerToEdit?: ProviderData | null;
};

export default function ProviderModal({ isOpen, onClose, onSave, providerToEdit }: ProviderModalProps) {
  const [razonSocial, setRazonSocial] = useState('');
  const [ruc, setRuc] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [contacto, setContacto] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (providerToEdit) {
        setRazonSocial(providerToEdit.razonSocial);
        setRuc(providerToEdit.ruc);
        setDireccion(providerToEdit.direccion);
        setTelefono(providerToEdit.telefono);
        setEmail(providerToEdit.email);
        setContacto(providerToEdit.contacto);
      } else {
        setRazonSocial('');
        setRuc('');
        setDireccion('');
        setTelefono('');
        setEmail('');
        setContacto('');
      }
    }
  }, [isOpen, providerToEdit]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: providerToEdit?.id,
      razonSocial,
      ruc,
      direccion,
      telefono,
      email,
      contacto
    });
    onClose();
  };

  const isEditMode = !!providerToEdit;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
        
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">
            {isEditMode ? 'Editar Proveedor' : 'Registrar Nuevo Proveedor'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Razón Social *</label>
              <input 
                type="text" required value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej: Importadora Juguetón S.R.L."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RUC / NIT *</label>
              <input 
                type="text" required value={ruc} onChange={(e) => setRuc(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="ID de Impuestos"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <input 
              type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ej: Av. Principal #123, Zona Central"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input 
                type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej: 77712345"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej: contacto@jugueton.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de Contacto</label>
            <input 
              type="text" value={contacto} onChange={(e) => setContacto(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ej: Juan Pérez (Agente de Ventas)"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
              {isEditMode ? 'Guardar Cambios' : 'Guardar Proveedor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}