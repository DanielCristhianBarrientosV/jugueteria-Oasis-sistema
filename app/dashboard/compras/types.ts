// app/dashboard/compras/types.ts

export interface Supply {
    id: number;
    date: string;
    providerName: string;
    totalAmount: number; // Calculado o estimado
    itemCount: number;
    proveedor: string;
    fecha: string;
    total: number;
    items: number;
    estado: string;
    details?: {
        producto: string;
        cantidad: number;
        precioUnitario: number;
        subtotal: number;
    }[];
}
