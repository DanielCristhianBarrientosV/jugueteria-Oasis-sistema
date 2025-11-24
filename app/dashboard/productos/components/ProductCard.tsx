// app/dashboard/productos/components/ProductCard.tsx
import React from "react";
import Badge from "@/components/ui/Badge"; // Asumiendo que tu Badge está aquí
import { Product } from '../types'; // ¡Importar el tipo correcto!

interface ProductCardProps {
  product: Product; // ¡Usar el tipo Product que definimos!
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const isLowStock = product.currentStock < product.minStock;
  const stockStatus = isLowStock ? "Bajo" : "Normal";
  const stockStatusVariant = isLowStock ? "danger" : "success"; // Asegúrate que tu Badge soporta estas variantes

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Información principal del producto */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 truncate">{product.name}</h3> {/* truncate para nombres largos */}
          <Badge>{product.code}</Badge>
        </div>
        <Badge variant="primary" className="self-start">{product.category}</Badge> {/* self-start para que no ocupe todo el ancho */}
      </div>

      {/* Detalles del producto - Reorganizado para más compacidad */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div>
          <p className="text-gray-500 text-xs">Stock Actual</p>
          <p className="font-semibold text-gray-900">{product.currentStock} unidades</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Stock Mínimo</p>
          <p className="font-semibold text-gray-900">{product.minStock} unidades</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Precio Mayorista</p>
          <p className="font-semibold text-gray-900">Bs. {product.majorPrice}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs">Precio Minorista</p>
          <p className="font-semibold text-gray-900">Bs. {product.minorPrice}</p>
        </div>
        <div className="col-span-2"> {/* Ocupa ambas columnas para el estado de stock */}
          <p className="text-gray-500 text-xs">Proveedor</p>
          <p className="font-semibold text-gray-900">{product.supplier}</p>
        </div>
        <div className="col-span-2 flex justify-end"> {/* Stock Status al final */}
          <Badge variant={stockStatusVariant}>{stockStatus}</Badge>
        </div>
      </div>
      
      {/* Acciones */}
      <div className="flex gap-2 justify-end pt-4 border-t border-gray-100 mt-auto"> {/* mt-auto para empujar al final */}
        <button
          onClick={() => onEdit(product)}
          className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-semibold"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-semibold"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;