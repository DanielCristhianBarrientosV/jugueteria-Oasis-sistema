'use client';

import { useState } from 'react';

const VentasPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Ventas</h1>
              <p className="text-gray-600 text-base">
                Gestiona las ventas y genera recibos automáticamente
              </p>
            </div>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva Venta
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Ventas Hoy */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Ventas Hoy</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">Bs. 2,450</p>
          <p className="text-gray-500 text-xs">18 ventas realizadas</p>
        </div>

        {/* Ventas Mes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-green-600 text-sm font-semibold">↑ 23%</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Ventas Mes</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">Bs. 45,678</p>
          <p className="text-gray-500 text-xs">Total de ventas</p>
        </div>

        {/* Ticket Promedio */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Ticket Promedio</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">Bs. 156</p>
          <p className="text-gray-500 text-xs">Promedio por venta</p>
        </div>

        {/* Ventas Pendientes */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
              Pendiente
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Ventas Pendientes</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">3</p>
          <p className="text-gray-500 text-xs">Por completar</p>
        </div>
      </div>

      {/* Historial de Ventas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Historial de Ventas
              </h2>
              <p className="text-gray-600 text-sm">
                Visualiza todas las ventas realizadas y su estado actual
              </p>
            </div>

            <div className="flex w-full lg:w-auto items-center gap-3">
              <div className="relative flex-1 lg:w-80">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="Buscar por código, cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Lista de ventas */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Venta 1 */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">V001</h3>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">Completada</span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">Minorista</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Cliente: Juan Pérez</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-700">
                      <span className="font-medium">Fecha:</span> 2024-01-15
                    </span>
                    <span className="text-gray-700">
                      <span className="font-medium">Items:</span> 3 productos
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-lg font-bold text-gray-900">Bs. 250</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Ver Recibo
                </button>
              </div>
            </div>

            {/* Venta 2 */}
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">V002</h3>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">Completada</span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">Minorista</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Cliente: María García</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-700">
                      <span className="font-medium">Fecha:</span> 2024-01-15
                    </span>
                    <span className="text-gray-700">
                      <span className="font-medium">Items:</span> 2 productos
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-lg font-bold text-gray-900">Bs. 180</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Ver Recibo
                </button>
              </div>
            </div>

            {/* Venta Pendiente */}
            <div className="flex items-center justify-between p-4 border border-orange-200 rounded-lg hover:shadow-md transition-shadow bg-orange-50/30">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">V003</h3>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded">Pendiente</span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">Minorista</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Cliente: Carlos López</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-700">
                      <span className="font-medium">Fecha:</span> 2024-01-15
                    </span>
                    <span className="text-gray-700">
                      <span className="font-medium">Items:</span> 1 producto
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-lg font-bold text-gray-900">Bs. 120</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-medium transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Completar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentasPage;