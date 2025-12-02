// app/api/products/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const allProductsFromDB = await prisma.producto.findMany({
      orderBy: {
        nombre: 'asc',
      },
      include: {
        categoria: true,
        precios: true,
      }
    });

    // Mapeamos los datos al formato que espera el frontend
    const formattedProducts = allProductsFromDB.map((dbProduct) => ({
      id: dbProduct.id,
      name: dbProduct.nombre,
      price: dbProduct.precios?.[0]?.monto?.toNumber() || 0,
      originalPrice: undefined,
      category: dbProduct.categoria?.nombre || 'General',
      ageRange: 'Todas las edades',
      image: dbProduct.imagenUrl || '/api/placeholder/300/300',
      description: dbProduct.descripcion || 'Sin descripción.',
      stock: dbProduct.stockActual,
      rating: 4.5,
      isNew: false,
      isOnSale: false,
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}