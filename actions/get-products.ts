'use server';

import prisma from "@/lib/prisma"; // Asegúrate de usar tu instancia compartida

// 1. Corregimos el TIPO para incluir stockActual
export type ProductWithDetails = {
  id: number;
  nombre: string;
  codigo: string;
  categoria: string;
  marca: string;
  precio: number;
  stock: number;        // Mantenemos este por compatibilidad
  stockActual: number;  // ✅ AGREGAMOS ESTE para que el ProductCard no de error
  estado: 'DISPONIBLE' | 'STOCK BAJO' | 'AGOTADO';
  imagenUrl: string;
};

export async function getProducts(): Promise<ProductWithDetails[]> {
  try {
    const products = await prisma.producto.findMany({
      include: {
        categoria: true,
        marca: true,
        // Ya no dependemos de 'inventarios' para el stock total, 
        // pero lo dejamos por si acaso.
        precios: {
          orderBy: { id: 'desc' },
          take: 1,
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    return products.map((product) => {
      // 1. Precio
      const precioDecimal = product.precios[0]?.monto;
      const precio = precioDecimal ? Number(precioDecimal) : 0;

      // 2. Stock (CORRECCIÓN CLAVE)
      // Leemos directamente la columna donde se guardan las actualizaciones
      const stock = product.stockActual || 0;

      // 3. Estado
      let estado: 'DISPONIBLE' | 'STOCK BAJO' | 'AGOTADO' = 'DISPONIBLE';
      if (stock === 0) {
        estado = 'AGOTADO';
      } else if (stock <= 5) {
        estado = 'STOCK BAJO';
      }

      // 4. Imagen
      const imagenUrl = product.imagenUrl || 'https://placehold.co/600x400?text=No+Image';

      return {
        id: product.id,
        nombre: product.nombre || 'Sin Nombre',
        codigo: product.codigo || `ID: ${product.id}`,
        categoria: product.categoria?.nombre || 'Sin Categoría',
        marca: product.marca?.nombre || 'Sin Marca',
        precio,
        stock,          // Valor para compatibilidad
        stockActual: stock, // ✅ Valor real para tu Card y Formulario
        estado,
        imagenUrl,
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}