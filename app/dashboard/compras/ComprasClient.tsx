'use client';

import { useState } from 'react';
import { Supply } from './types';
import CompraModal from './components/CompraModal';
import PurchaseDetailsModal from './components/PurchaseDetailsModal';
import { createCompraAction, deleteCompraAction, CompraItem } from '@/app/actions/compra-actions';

interface ComprasClientProps {
    initialSupplies: Supply[];
    productsList: { id: number; nombre: string }[];
    providersList: { id: number; nombre: string }[];
}

export default function ComprasClient({ initialSupplies, productsList, providersList }: ComprasClientProps) {
    const [supplies, setSupplies] = useState<Supply[]>(initialSupplies);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedSupply, setSelectedSupply] = useState<Supply | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    const filteredSupplies = supplies.filter(s =>
        s.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toString().includes(searchTerm)
    );

    const handleCreateCompra = async (proveedorId: number, items: CompraItem[]) => {
        const res = await createCompraAction(proveedorId, items);
        if (res.success) {
            alert("Compra registrada correctamente");
            setIsCreateModalOpen(false);
            window.location.reload();
        } else {
            alert("Error: " + res.error);
        }
    };

    const handleViewDetails = (supply: Supply) => {
        setSelectedSupply(supply);
        setIsDetailsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Compras y Abastecimiento</h1>
                    <p className="text-gray-500 mt-1">Gestiona las compras de mercadería y proveedores</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Nueva Compra
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar por proveedor o ID..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-sm">ID</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Proveedor</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Fecha</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-sm text-right">Total</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-sm text-center">Items</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Estado</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-sm text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredSupplies.length > 0 ? (
                                filteredSupplies.map((supply) => (
                                    <tr key={supply.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">#{supply.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{supply.providerName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(supply.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Bs. {supply.totalAmount.toLocaleString('es-BO', { minimumFractionDigits: 2 })}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 text-center">{supply.itemCount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {supply.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleViewDetails(supply)}
                                                    className="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md transition-colors"
                                                    title="Ver Detalles"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                        No se encontraron compras.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <CompraModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSave={handleCreateCompra}
                productos={productsList}
                proveedores={providersList}
            />

            <PurchaseDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                supply={selectedSupply}
            />
        </div >
    );
}
