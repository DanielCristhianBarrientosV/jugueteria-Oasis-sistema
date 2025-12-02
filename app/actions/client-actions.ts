'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type ClientData = {
    id?: number;
    name: string; // Nombre completo o solo nombre
    email: string;
    phone: string;
    address: string;
    isActive: boolean;
};

export async function getClientsAction() {
    try {
        const clients = await prisma.cliente.findMany({
            include: {
                persona: true
            },
            orderBy: {
                fechaRegistro: 'desc'
            }
        });

        return {
            success: true,
            data: clients.map(c => ({
                id: c.id,
                name: `${c.persona.nombre} ${c.persona.apellido}`.trim(),
                email: c.persona.email || '',
                phone: c.persona.telefono || '',
                address: c.persona.direccion || '',
                isActive: c.estado || false,
                registeredAt: c.fechaRegistro ? c.fechaRegistro.toISOString().split('T')[0] : ''
            }))
        };
    } catch (error) {
        console.error("Error fetching clients:", error);
        return { success: false, error: "Error al obtener clientes" };
    }
}

export async function createClientAction(data: ClientData) {
    try {
        // Separar nombre y apellido (simple split)
        const nameParts = data.name.trim().split(' ');
        const nombre = nameParts[0];
        const apellido = nameParts.slice(1).join(' ') || '-';

        const result = await prisma.$transaction(async (tx) => {
            // 1. Crear Persona
            const persona = await tx.persona.create({
                data: {
                    nombre,
                    apellido,
                    email: data.email,
                    telefono: data.phone,
                    direccion: data.address,
                    tipoPersona: 'CLIENTE'
                }
            });

            // 2. Crear Cliente
            const cliente = await tx.cliente.create({
                data: {
                    personaId: persona.id,
                    estado: data.isActive,
                    fechaRegistro: new Date(),
                    // tipoClienteId: 1 // Default o null
                }
            });

            return cliente;
        });

        revalidatePath("/dashboard/clientes");
        return { success: true, data: result };
    } catch (error) {
        console.error("Error creating client:", error);
        return { success: false, error: "Error al crear cliente" };
    }
}

export async function updateClientAction(id: number, data: ClientData) {
    try {
        const nameParts = data.name.trim().split(' ');
        const nombre = nameParts[0];
        const apellido = nameParts.slice(1).join(' ') || '-';

        // Obtener el cliente para saber su personaId
        const currentClient = await prisma.cliente.findUnique({
            where: { id },
            select: { personaId: true }
        });

        if (!currentClient) {
            return { success: false, error: "Cliente no encontrado" };
        }

        await prisma.$transaction(async (tx) => {
            // 1. Actualizar Persona
            await tx.persona.update({
                where: { id: currentClient.personaId },
                data: {
                    nombre,
                    apellido,
                    email: data.email,
                    telefono: data.phone,
                    direccion: data.address
                }
            });

            // 2. Actualizar Cliente
            await tx.cliente.update({
                where: { id },
                data: {
                    estado: data.isActive
                }
            });
        });

        revalidatePath("/dashboard/clientes");
        return { success: true };
    } catch (error) {
        console.error("Error updating client:", error);
        return { success: false, error: "Error al actualizar cliente" };
    }
}

export async function deleteClientAction(id: number) {
    try {
        // Soft delete (cambiar estado a inactivo)
        await prisma.cliente.update({
            where: { id },
            data: { estado: false }
        });

        revalidatePath("/dashboard/clientes");
        return { success: true };
    } catch (error) {
        console.error("Error deleting client:", error);
        return { success: false, error: "Error al eliminar cliente" };
    }
}
