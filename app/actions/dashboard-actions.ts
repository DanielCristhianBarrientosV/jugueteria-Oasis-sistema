'use server';

import prisma from "@/lib/prisma";
import { startOfMonth, endOfMonth } from "date-fns";

export async function getDashboardStats() {
    try {
        const now = new Date();
        const startOfCurrentMonth = startOfMonth(now);
        const endOfCurrentMonth = endOfMonth(now);

        // 1. Métricas Principales
        const [totalProducts, activeClients, activeProviders, salesThisMonthAgg] = await Promise.all([
            prisma.producto.count(),
            prisma.cliente.count({ where: { estado: true } }),
            prisma.proveedor.count(), // Asumimos todos activos o filtrar si hay campo estado
            prisma.factura.aggregate({
                _sum: { total: true },
                where: {
                    fecha: {
                        gte: startOfCurrentMonth,
                        lte: endOfCurrentMonth
                    }
                }
            })
        ]);

        const totalSalesMonth = Number(salesThisMonthAgg._sum.total || 0);

        // 2. Productos con Stock Bajo (Top 5)
        const lowStockProducts = await prisma.producto.findMany({
            where: {
                stockActual: {
                    lt: 10 // Umbral fijo por ahora
                }
            },
            take: 5,
            orderBy: {
                stockActual: 'asc'
            },
            select: {
                nombre: true,
                stockActual: true,
                // minStock: true // Si existiera en el modelo
            }
        });

        // 3. Ventas Recientes (Top 5)
        const recentSales = await prisma.factura.findMany({
            take: 5,
            orderBy: {
                fecha: 'desc'
            },
            include: {
                pedido: {
                    include: {
                        cliente: {
                            include: {
                                persona: true
                            }
                        }
                    }
                }
            }
        });

        const formattedRecentSales = recentSales.map(sale => ({
            id: `FACT-${sale.id}`,
            customer: sale.pedido?.cliente
                ? `${sale.pedido.cliente.persona.nombre} ${sale.pedido.cliente.persona.apellido}`
                : 'Cliente Casual',
            date: sale.fecha ? sale.fecha.toLocaleDateString('es-BO') : 'N/A',
            total: Number(sale.total || 0)
        }));

        return {
            metrics: {
                totalProducts,
                activeClients,
                activeProviders,
                totalSalesMonth
            },
            lowStockProducts: lowStockProducts.map(p => ({
                name: p.nombre || 'Sin Nombre',
                stock: p.stockActual || 0,
                min: 10 // Placeholder
            })),
            recentSales: formattedRecentSales
        };

    } catch (error) {
        console.error("Error getting dashboard stats:", error);
        return {
            metrics: { totalProducts: 0, activeClients: 0, activeProviders: 0, totalSalesMonth: 0 },
            lowStockProducts: [],
            recentSales: []
        };
    }
}
