'use client';

import { useState } from 'react';
// Asegúrate de tener creado este componente en la carpeta components
import ReceiptModal from './components/ReceiptModal';

// --- 1. CORRECCIÓN DE TIPOS (Para eliminar el error rojo) ---
type ProductoVenta = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  imagenUrl: string;
  category: string; // Usamos 'category' para coincidir con tus datos
};

type ItemCarrito = ProductoVenta & {
  cantidad: number;
};

type Cliente = {
  id: number;
  nombre: string;
  ci: string;
  tipo: 'Normal' | 'Vip';
};

// --- DATOS DUMMY ---
const PRODUCTOS_DISPONIBLES: ProductoVenta[] = [
  { id: 1, nombre: 'Carro RC 4x4', precio: 180, stock: 5, category: 'Deportes', imagenUrl: 'https://placehold.co/200x200/ef4444/white?text=Carro' },
  { id: 2, nombre: 'Barbie Edición Especial', precio: 150, stock: 10, category: 'Muñecas', imagenUrl: 'https://placehold.co/200x200/ec4899/white?text=Barbie' },
  { id: 3, nombre: 'Lego City Policía', precio: 250, stock: 2, category: 'Construcción', imagenUrl: 'https://placehold.co/200x200/3b82f6/white?text=Lego' },
  { id: 4, nombre: 'Monopoly Clásico', precio: 100, stock: 8, category: 'Juegos', imagenUrl: 'https://placehold.co/200x200/10b981/white?text=Juego' },
  { id: 5, nombre: 'Pelota de Fútbol', precio: 50, stock: 20, category: 'Deportes', imagenUrl: 'https://placehold.co/200x200/f59e0b/white?text=Pelota' },
];

const CLIENTES_DISPONIBLES: Cliente[] = [
  { id: 1, nombre: 'Cliente Casual', ci: '0000000', tipo: 'Normal' },
  { id: 2, nombre: 'Juan Pérez', ci: '8493021', tipo: 'Vip' },
  { id: 3, nombre: 'María Gómez', ci: '4930212', tipo: 'Normal' },
];

export default function VentasPage() {
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [showReceipt, setShowReceipt] = useState(false); // Estado para el modal de recibo

  // Filtrar productos
  const productosFiltrados = PRODUCTOS_DISPONIBLES.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Lógica del Carrito
  const agregarAlCarrito = (producto: ProductoVenta) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        if (existe.cantidad < producto.stock) {
          return prev.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
        }
        return prev;
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id: number, delta: number) => {
    setCarrito(prev => prev.map(item => {
      if (item.id === id) {
        const nuevaCantidad = item.cantidad + delta;
        return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : item;
      }
      return item;
    }));
  };

  const eliminarDelCarrito = (id: number) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  // Cálculos
  const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const descuento = clienteSeleccionado?.tipo === 'Vip' ? subtotal * 0.10 : 0;
  const total = subtotal - descuento;

  return (
    <div className="h-[calc(100vh-2rem)] flex gap-4 p-4 bg-gray-100 overflow-hidden">
      
      {/* --- IZQUIERDA: CATÁLOGO --- */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Buscador */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex-shrink-0">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Buscar producto por nombre..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              autoFocus
            />
          </div>
        </div>

        {/* Grilla de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-4 pr-2">
          {productosFiltrados.map((prod) => (
            <button 
              key={prod.id}
              onClick={() => agregarAlCarrito(prod)}
              disabled={prod.stock === 0}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all flex flex-col items-center text-center group disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden h-auto min-h-[220px]"
            >
              <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-1 bg-gray-100 text-gray-500 rounded-full">{prod.category}</span>
              
              <div className="w-28 h-28 mb-3 overflow-hidden rounded-lg bg-gray-50">
                 <img src={prod.imagenUrl} alt={prod.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h4 className="font-semibold text-gray-800 text-sm h-10 leading-tight flex items-center justify-center w-full px-2">{prod.nombre}</h4>
              <div className="mt-auto w-full flex justify-between items-end border-t border-gray-100 pt-2">
                <span className="text-xs text-gray-500 font-medium">Stock: {prod.stock}</span>
                <span className="text-lg font-bold text-blue-600">Bs. {prod.precio}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* --- DERECHA: TICKET (Ancho Fijo corregido) --- */}
      <div className="w-96 flex-shrink-0 bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col h-full">
        
        {/* 1. Selección de Cliente */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl space-y-3 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-gray-700">Datos del Cliente</h2>
            {clienteSeleccionado && (
               <span className={`text-xs px-2 py-1 rounded-full font-bold ${clienteSeleccionado.tipo === 'Vip' ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-600'}`}>
                 {clienteSeleccionado.tipo}
               </span>
            )}
          </div>
          <div className="flex gap-2">
            <select 
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              onChange={(e) => {
                const cliente = CLIENTES_DISPONIBLES.find(c => c.id === Number(e.target.value));
                setClienteSeleccionado(cliente || null);
              }}
            >
              <option value="">Seleccionar Cliente...</option>
              {CLIENTES_DISPONIBLES.map(c => (
                <option key={c.id} value={c.id}>{c.nombre} - {c.ci}</option>
              ))}
            </select>
            <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors" title="Nuevo Cliente">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>
        </div>

        {/* 2. Lista de Items (Scrollable) */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {carrito.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3 opacity-60">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <p className="text-sm font-medium">El carrito está vacío</p>
              <p className="text-xs">Selecciona productos del catálogo</p>
            </div>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="flex items-center justify-between group bg-white p-2 rounded-lg border border-transparent hover:border-gray-200 transition-all">
                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                  <div className="w-10 h-10 rounded-md bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
                    <img src={item.imagenUrl} className="w-full h-full object-cover" alt={item.nombre} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.nombre}</p>
                    <p className="text-xs text-gray-500">Bs. {item.precio} c/u</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-2">
                  <div className="flex items-center bg-gray-100 rounded-lg h-8">
                    <button onClick={() => cambiarCantidad(item.id, -1)} className="w-7 h-full text-gray-600 hover:bg-gray-200 hover:text-red-600 rounded-l-lg transition-colors flex items-center justify-center font-bold">-</button>
                    <span className="text-xs font-bold w-8 text-center">{item.cantidad}</span>
                    <button onClick={() => cambiarCantidad(item.id, 1)} className="w-7 h-full text-gray-600 hover:bg-gray-200 hover:text-blue-600 rounded-r-lg transition-colors flex items-center justify-center font-bold">+</button>
                  </div>
                  <div className="w-16 text-right">
                    <p className="text-sm font-bold text-gray-800">Bs. {item.precio * item.cantidad}</p>
                  </div>
                  <button onClick={() => eliminarDelCarrito(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 3. Totales y Confirmación (Fijo abajo) */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-xl space-y-3 flex-shrink-0">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Bs. {subtotal.toFixed(2)}</span>
            </div>
            {descuento > 0 && (
              <div className="flex justify-between text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                <span>Descuento (VIP)</span>
                <span>- Bs. {descuento.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Impuestos (0%)</span>
              <span>Bs. 0.00</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-gray-800 font-bold text-lg">Total a Pagar</span>
            <span className="text-2xl font-extrabold text-blue-600">Bs. {total.toFixed(2)}</span>
          </div>
          
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform active:scale-[0.98]"
            disabled={carrito.length === 0}
            onClick={() => setShowReceipt(true)} // Abre el modal
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <span>Confirmar Venta</span>
          </button>
        </div>
      </div>

      {/* Modal del Recibo */}
      <ReceiptModal 
        isOpen={showReceipt}
        onClose={() => {
          setShowReceipt(false);
          setCarrito([]);
          setClienteSeleccionado(null);
        }}
        total={total}
        items={carrito}
        cliente={clienteSeleccionado?.nombre || 'Cliente Casual'}
      />
    </div>
  );
}