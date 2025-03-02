import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

// Define a interface para o agendamento
export interface Appointment {
  id: string;
  clientName: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  price?: number; // Opcional, caso o preço não seja informado
  vehicle: string;
  status: string;
  notes?: string;
}

// Interface para os filtros (incluindo os filtros avançados)
export interface AppointmentFilters {
  status: string;
  date: string;
  search: string;
  clientName: string;
  phone: string;
  service: string;
  vehicle: string;
  minPrice: string;
  maxPrice: string;
}

export const useDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado inicial com filtros básicos e avançados
  const [filters, setFilters] = useState<AppointmentFilters>({
    status: 'all',
    date: '',
    search: '',
    clientName: '',
    phone: '',
    service: '',
    vehicle: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsCollectionRef = collection(db, 'Appointments');
        const querySnapshot = await getDocs(appointmentsCollectionRef);

        const fetchedAppointments = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log(`Documento ${doc.id}:`, data);
          if (
            !data.clientName ||
            !data.phone ||
            !data.service ||
            !data.date ||
            !data.time ||
            !data.vehicle ||
            !data.status
          ) {
            console.warn(`Documento ${doc.id} com dados incompletos:`, data);
          }
          return {
            id: doc.id,
            clientName: data.clientName || '',
            phone: data.phone || '',
            service: data.service || '',
            date: data.date || '',
            time: data.time || '',
            price: data.price,
            vehicle: data.vehicle || '',
            status: data.status || 'Pendente',
            notes: data.notes || ''
          } as Appointment;
        });
        setAppointments(fetchedAppointments);
        setFilteredAppointments(fetchedAppointments);
      } catch (err) {
        console.error('Erro ao buscar agendamentos:', err);
        setError('Erro ao buscar agendamentos');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    let result = [...appointments];

    // Filtro por status
    if (filters.status !== 'all') {
      result = result.filter(app => app.status.toLowerCase() === filters.status.toLowerCase());
    }

    // Filtro por data
    if (filters.date) {
      result = result.filter(app => app.date === filters.date);
    }

    // Busca geral (nome, veículo, serviço e telefone)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(app =>
        app.clientName.toLowerCase().includes(searchTerm) ||
        app.vehicle.toLowerCase().includes(searchTerm) ||
        app.service.toLowerCase().includes(searchTerm) ||
        app.phone.includes(searchTerm)
      );
    }

    // Filtros avançados (se preenchidos, podem ser aplicados conforme necessidade)
    if (filters.clientName) {
      result = result.filter(app => app.clientName.toLowerCase().includes(filters.clientName.toLowerCase()));
    }
    if (filters.phone) {
      result = result.filter(app => app.phone.includes(filters.phone));
    }
    if (filters.service) {
      result = result.filter(app => app.service.toLowerCase().includes(filters.service.toLowerCase()));
    }
    if (filters.vehicle) {
      result = result.filter(app => app.vehicle.toLowerCase().includes(filters.vehicle.toLowerCase()));
    }
    if (filters.minPrice) {
      const min = parseFloat(filters.minPrice);
      result = result.filter(app => (app.price ?? 0) >= min);
    }
    if (filters.maxPrice) {
      const max = parseFloat(filters.maxPrice);
      result = result.filter(app => (app.price ?? 0) <= max);
    }

    setFilteredAppointments(result);
  }, [filters, appointments]);

  // Atualiza os filtros com os novos valores parciais
  const updateFilters = (newFilters: Partial<AppointmentFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Atualiza o status do agendamento no Firestore e no estado local
  const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
    try {
      const appointmentDocRef = doc(db, 'Appointments', appointmentId);
      await updateDoc(appointmentDocRef, { status: newStatus });
      setAppointments(prevAppointments =>
        prevAppointments.map(app => app.id === appointmentId ? { ...app, status: newStatus } : app)
      );
    } catch (error) {
      console.error('Erro ao atualizar o status do agendamento:', error);
      setError('Erro ao atualizar o status do agendamento');
    }
  };

  return { 
    appointments: filteredAppointments, 
    allAppointments: appointments,
    loading, 
    error,
    filters,
    updateFilters,
    updateAppointmentStatus
  };
};
