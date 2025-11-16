'use client';

// Definimos qué datos necesita este componente para funcionar
type ReceiptModalProps = {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  items: { nombre: string; cantidad: number; precio: number }[];
  cliente: string;
};

export default function ReceiptModal({ isOpen, onClose, total, items, cliente }: ReceiptModalProps) {
  // Si no está abierto, no renderizamos nada (invisible)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      {/* Contenedor del Ticket (Blanco) */}
      <div className="bg-white w-80 rounded-lg shadow-2xl transform transition-all scale-100 relative flex flex-col max-h-[90vh]">
        
        {/* Decoración: Borde dentado superior (efecto ticket) */}
        <div className="absolute -top-2 left-0 right-0 h-4 bg-white" style={{clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)'}}></div>

        {/* Contenido Scrollable */}
        <div className="p-6 overflow-y-auto">
          <div className="text-center mb-6 mt-2">
            <h2 className="text-2xl font-bold text-gray-800">OASIS STORE</h2>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Juguetería & Diversión</p>
            <p className="text-xs text-gray-400 mt-1">NIT: 123456789</p>
            <p className="text-xs text-gray-400">La Paz, Bolivia</p>
          </div>

          <div className="border-b-2 border-dashed border-gray-200 my-4"></div>
          
          <div className="text-sm text-gray-600 space-y-1 mb-4">
            <p className="flex justify-between"><span>Cliente:</span> <span className="font-bold text-gray-800">{cliente}</span></p>
            <p className="flex justify-between"><span>Fecha:</span> <span>{new Date().toLocaleDateString()}</span></p>
            <p className="flex justify-between"><span>Hora:</span> <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span></p>
          </div>

          <div className="border-b-2 border-dashed border-gray-200 my-4"></div>

          {/* Lista de Items */}
          <div className="space-y-3 mb-6">
            {items.map((item, index) => (
              <div key={index} className="text-sm">
                <div className="flex justify-between text-gray-800 font-medium">
                  <span>{item.nombre}</span>
                  <span>Bs. {(item.precio * item.cantidad).toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {item.cantidad} x {item.precio.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-gray-800 pt-4 mb-2">
            <div className="flex justify-between items-center text-xl font-extrabold text-gray-900">
              <span>TOTAL</span>
              <span>Bs. {total.toFixed(2)}</span>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4">¡Gracias por su compra!</p>
          </div>
        </div>

        {/* Botones de Acción (Fijos abajo) */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-lg flex flex-col gap-2">
          <button 
            onClick={() => window.print()} 
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-black font-medium flex justify-center items-center gap-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Imprimir Recibo
          </button>
          <button 
            onClick={onClose}
            className="w-full bg-white text-gray-700 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Nueva Venta
          </button>
        </div>

      </div>
    </div>
  );
}