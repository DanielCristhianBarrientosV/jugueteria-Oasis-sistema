'use client';

import { useState, useMemo, useEffect } from 'react';
import { Client, ClientFormData } from '../types';
import { getClientsAction, createClientAction, updateClientAction, deleteClientAction } from '@/app/actions/client-actions';

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Cargar clientes al montar
  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    setIsLoading(true);
    const res = await getClientsAction();
    if (res.success && res.data) {
      setClients(res.data);
    } else {
      console.error(res.error);
      alert("Error al cargar clientes");
    }
    setIsLoading(false);
  };

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm);

      const matchesActiveStatus =
        filterActive === 'all' ||
        (filterActive === 'active' && client.isActive) ||
        (filterActive === 'inactive' && !client.isActive);

      return matchesSearch && matchesActiveStatus;
    });
  }, [clients, searchTerm, filterActive]);

  const saveClient = async (clientData: ClientFormData & { id?: number; isActive?: boolean }) => {
    if (clientData.id) {
      // Editar
      const res = await updateClientAction(clientData.id, {
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        address: clientData.address,
        isActive: clientData.isActive ?? true
      });

      if (res.success) {
        await loadClients(); // Recargar lista
      } else {
        alert("Error al actualizar: " + res.error);
      }
    } else {
      // Crear
      const res = await createClientAction({
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        address: clientData.address,
        isActive: true
      });

      if (res.success) {
        await loadClients(); // Recargar lista
      } else {
        alert("Error al crear: " + res.error);
      }
    }
  };

  const deleteClient = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente? (Se marcará como inactivo)')) {
      const res = await deleteClientAction(id);
      if (res.success) {
        await loadClients();
      } else {
        alert("Error al eliminar: " + res.error);
      }
    }
  };

  return {
    clients: filteredClients,
    totalClients: clients.length,
    filteredCount: filteredClients.length,
    searchTerm,
    setSearchTerm,
    filterActive,
    setFilterActive,
    saveClient,
    deleteClient,
    isLoading
  };
};