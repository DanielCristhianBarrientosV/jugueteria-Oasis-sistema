import React from 'react';
import { Supply } from '../types';

interface PurchaseDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    supply: Supply | null;
}

const PurchaseDetailsModal = ({ isOpen, onClose, supply }: PurchaseDetailsModalProps) => {
    if (!isOpen || !supply) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Detalle de Compra #{supply.id}</h2>
                        <p className="text-sm text-gray-500">{supply.date} - {supply.providerName}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 font-semibold text-sm">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Producto</th>
                                    <th className="px-4 py-3 text-center">Cantidad</th>
                                    <th className="px-4 py-3 text-right">Precio Unit.</th>
                                    <th className="px-4 py-3 text-right rounded-r-lg">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {supply.details?.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-900">{item.producto}</td>
                                        <td className="px-4 py-3 text-center text-gray-700">{item.cantidad}</td>
                                        <td className="px-4 py-3 text-right text-gray-700">Bs. {item.precioUnitario.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-right font-semibold text-gray-900">Bs. {item.subtotal.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="border-t border-gray-200">
                                <tr>
                                    <td colSpan={3} className="px-4 py-4 text-right font-bold text-gray-900">Total General:</td>
                                    <td className="px-4 py-4 text-right font-bold text-blue-600 text-lg">Bs. {supply.totalAmount.toLocaleString('es-BO', { minimumFractionDigits: 2 })}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseDetailsModal;
