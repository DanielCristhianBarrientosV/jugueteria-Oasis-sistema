'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type CompraItem = {
    productoId: number;
    cantidad: number;
    precioUnitario: number;
};

export async function createCompraAction(proveedorId: number, items: CompraItem[]) {
    try {
        if (!items || items.length === 0) {
            return { success: false, error: "La lista de compra está vacía" };
        }

        // 1. Calcular Total
        const total = items.reduce((acc, item) => acc + (item.cantidad * item.precioUnitario), 0);

        // 2. Crear Suministro (Cabecera)
        const suministro = await prisma.suministro.create({
            data: {
                fecha: new Date(),
                proveedorId: proveedorId,
                total: total, // [NEW] Guardamos el total calculado
            },
        });

        // 2. Crear Detalles y Actualizar Stock
        for (const item of items) {
            // Crear detalle suministro
            await prisma.detalleSuministro.create({
                data: {
                    suministroId: suministro.id,
                    productoId: item.productoId,
                    cantidad: item.cantidad,
                    precioUnitario: item.precioUnitario,
                },
            });

            // Actualizar Stock (Aumentar)
            const inventario = await prisma.inventario.findFirst({
                where: { productoId: item.productoId },
            });

            if (inventario) {
                await prisma.inventario.update({
                    where: { id: inventario.id },
                    data: { stock: { increment: item.cantidad } },
                });
            } else {
                await prisma.inventario.create({
                    data: {
                        productoId: item.productoId,
                        stock: item.cantidad,
                        // almacenId: 1 // Default
                    },
                });
            }
        }

        // 3. Revalidar paths
        revalidatePath("/dashboard/compras");
        revalidatePath("/dashboard/inventario");
        revalidatePath("/dashboard/productos");

        return { success: true, data: suministro };
    } catch (error) {
        console.error("Error creating purchase:", error);
        return { success: false, error: "Error al registrar la compra" };
    }
}

export async function deleteCompraAction(id: number) {
    try {
        // 1. Obtener los detalles para revertir el stock
        const suministro = await prisma.suministro.findUnique({
            where: { id },
            include: { detalles: true }
        });

        if (!suministro) {
            return { success: false, error: "Compra no encontrada" };
        }

        // 2. Revertir Stock (Restar)
        for (const detalle of suministro.detalles) {
            if (detalle.productoId) {
                const inventario = await prisma.inventario.findFirst({
                    where: { productoId: detalle.productoId }
                });

                if (inventario) {
                    await prisma.inventario.update({
                        where: { id: inventario.id },
                        data: { stock: { decrement: (detalle.cantidad || 0) } }
                    });
                }
            }
        }

        // 3. Eliminar Suministro (Cascade delete debería eliminar detalles si está configurado, 
        // pero por seguridad eliminamos detalles primero si no hay cascade)
        await prisma.detalleSuministro.deleteMany({
            where: { suministroId: id }
        });

        await prisma.suministro.delete({
            where: { id }
        });

        revalidatePath("/dashboard/compras");
        revalidatePath("/dashboard/inventario");
        revalidatePath("/dashboard/productos");

        return { success: true };
    } catch (error) {
        console.error("Error deleting purchase:", error);
        return { success: false, error: "Error al eliminar la compra" };
    }
}
