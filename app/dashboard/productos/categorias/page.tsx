"use client";

import { useState } from "react";
// Asumo que la ruta a tu modal es esta, ajústala si es necesario
import CategoryModal, {
  CategoriaData,
  CategoriaSaveData,
} from "../components/CategoryModal";

type Categoria = {
  id: number;
  nombre: string;
  descripcion: string;
  estado: "Activo" | "Inactivo" | string;
  productosCount: number;
};

const DUMMY_CATEGORIAS: Categoria[] = [
  {
    id: 1,
    nombre: "Juguetes de Construcción",
    descripcion: "Bloques y legos",
    estado: "Activo",
    productosCount: 15,
  },
  {
    id: 2,
    nombre: "Muñecas y Accesorios",
    descripcion: "Barbies, casas y ropa",
    estado: "Activo",
    productosCount: 8,
  },
  {
    id: 3,
    nombre: "Juegos de Mesa",
    descripcion: "Cartas y tableros",
    estado: "Inactivo",
    productosCount: 3,
  },
  {
    id: 4,
    nombre: "Deportes",
    descripcion: "Pelotas y aire libre",
    estado: "Activo",
    productosCount: 12,
  },
];

export default function CategoriasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>(DUMMY_CATEGORIAS);
  const [categoriaParaEditar, setCategoriaParaEditar] =
    useState<Categoria | null>(null);

  // --- ✨ 1. ESTADO DE PAGINACIÓN (VISUAL) ---
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3); // Simulamos que hay 3 páginas

  const handleSaveCategory = (data: CategoriaSaveData) => {
    if (data.id) {
      setCategorias((prevCategorias) =>
        prevCategorias.map((cat) =>
          cat.id === data.id
            ? {
                ...cat,
                nombre: data.nombre,
                descripcion: data.descripcion,
                estado: data.estado,
              }
            : cat
        )
      );
    } else {
      const nuevaCategoria: Categoria = {
        id: Date.now(), // ID temporal
        nombre: data.nombre,
        descripcion: data.descripcion,
        estado: data.estado,
        productosCount: 0,
      };
      setCategorias([nuevaCategoria, ...categorias]);
    }
  };

  const handleAbrirModalCrear = () => {
    setCategoriaParaEditar(null);
    setIsModalOpen(true);
  };

  const handleAbrirModalEditar = (categoria: Categoria) => {
    setCategoriaParaEditar(categoria);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")
    ) {
      setCategorias((prev) => prev.filter((cat) => cat.id !== id));
    }
  };

  // --- ✨ 2. FUNCIONES PARA BOTONES (VISUAL) ---
  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };
  const goToPrevPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categorías</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gestiona las familias de productos de tu tienda
          </p>
        </div>

        <button
          onClick={handleAbrirModalCrear}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Nueva Categoría</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50">
          <input
            type="text"
            placeholder="Buscar categoría..."
            className="block w-full max-w-md pl-4 pr-3 py-2 border border-gray-300 rounded-lg bg-white outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productos
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categorias.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {cat.nombre}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {cat.descripcion}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        cat.estado === "Activo"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {cat.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {cat.productosCount} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleAbrirModalEditar(cat)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- ✨ 3. SECCIÓN DE PAGINACIÓN VISUAL --- */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
          <div className="text-sm text-gray-500">
            Página{" "}
            <span className="font-medium text-gray-800">{currentPage}</span> de{" "}
            <span className="font-medium text-gray-800">{totalPages}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        categoriaEditar={categoriaParaEditar}
      />
    </div>
  );
}
