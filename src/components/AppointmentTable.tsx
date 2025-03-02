import React, { useState } from 'react';
import { Appointment } from '../hooks/useDashboard';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

interface AppointmentFilters {
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

interface AppointmentTableProps {
  appointments: Appointment[];
  allAppointments: Appointment[];
  loading: boolean;
  error: string | null;
  filters: AppointmentFilters;
  updateFilters: (filters: Partial<AppointmentFilters>) => void;
  updateAppointmentStatus: (appointmentId: string, newStatus: string) => Promise<void>;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({ 
  appointments, 
  allAppointments,
  loading, 
  error,
  filters,
  updateFilters,
  updateAppointmentStatus
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const clearFilters = () => {
    updateFilters({
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
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Erro!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  // Datas únicas para o filtro de data
  const uniqueDates = [...new Set(allAppointments.map(app => app.date))].sort();

  return (
    <div>
      {/* Seção de filtros */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center">
            <Filter size={18} className="mr-2" />
            Filtros
          </h3>
          <div className="flex items-center gap-4">
            {(filters.status !== 'all' ||
              filters.date ||
              filters.search ||
              filters.clientName ||
              filters.phone ||
              filters.service ||
              filters.vehicle ||
              filters.minPrice ||
              filters.maxPrice) && (
              <button
                onClick={clearFilters}
                className="flex items-center text-sm text-red-600 hover:text-red-800"
              >
                <X size={16} className="mr-1" />
                Limpar filtros
              </button>
            )}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              {showAdvanced ? (
                <>
                  <ChevronUp size={16} className="mr-1" /> Ocultar filtros avançados
                </>
              ) : (
                <>
                  <ChevronDown size={16} className="mr-1" /> Mostrar filtros avançados
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filtros básicos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro de Status */}
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status-filter"
              value={filters.status}
              onChange={(e) => updateFilters({ status: e.target.value })}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Todos</option>
              <option value="Confirmado">Confirmado</option>
              <option value="Pendente">Pendente</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          {/* Filtro de Data */}
          <div>
            <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Data
            </label>
            <select
              id="date-filter"
              value={filters.date}
              onChange={(e) => updateFilters({ date: e.target.value })}
              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas as datas</option>
              {uniqueDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('pt-BR')}
                </option>
              ))}
            </select>
          </div>
          {/* Busca geral */}
          <div>
            <label htmlFor="search-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Busca
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                id="search-filter"
                type="text"
                placeholder="Buscar em todos os campos..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Filtros avançados */}
        {showAdvanced && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filtro por Cliente */}
            <div>
              <label htmlFor="clientName-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Cliente
              </label>
              <input
                id="clientName-filter"
                type="text"
                placeholder="Nome do cliente"
                value={filters.clientName}
                onChange={(e) => updateFilters({ clientName: e.target.value })}
                className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Filtro por Telefone */}
            <div>
              <label htmlFor="phone-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <input
                id="phone-filter"
                type="text"
                placeholder="Telefone"
                value={filters.phone}
                onChange={(e) => updateFilters({ phone: e.target.value })}
                className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Filtro por Serviço */}
            <div>
              <label htmlFor="service-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Serviço
              </label>
              <input
                id="service-filter"
                type="text"
                placeholder="Serviço"
                value={filters.service}
                onChange={(e) => updateFilters({ service: e.target.value })}
                className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Filtro por Veículo */}
            <div>
              <label htmlFor="vehicle-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Veículo
              </label>
              <input
                id="vehicle-filter"
                type="text"
                placeholder="Veículo"
                value={filters.vehicle}
                onChange={(e) => updateFilters({ vehicle: e.target.value })}
                className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Filtro por Preço Mínimo */}
            <div>
              <label htmlFor="minPrice-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Preço Mínimo
              </label>
              <input
                id="minPrice-filter"
                type="number"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => updateFilters({ minPrice: e.target.value })}
                className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {/* Filtro por Preço Máximo */}
            <div>
              <label htmlFor="maxPrice-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Preço Máximo
              </label>
              <input
                id="maxPrice-filter"
                type="number"
                placeholder="0"
                value={filters.maxPrice}
                onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Exibição da contagem de resultados */}
      <div className="mb-4 text-sm text-gray-600">
        Exibindo {appointments.length} de {allAppointments.length} agendamentos
      </div>

      {appointments.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-8 rounded text-center">
          <p className="text-lg">Nenhum agendamento encontrado com os filtros selecionados.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Cliente</th>
                <th className="py-3 px-4 text-left">Telefone</th>
                <th className="py-3 px-4 text-left">Veículo</th>
                <th className="py-3 px-4 text-left">Serviço</th>
                <th className="py-3 px-4 text-left">Data</th>
                <th className="py-3 px-4 text-left">Horário</th>
                <th className="py-3 px-4 text-left">Preço</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{appointment.clientName}</td>
                  <td className="py-3 px-4">{appointment.phone}</td>
                  <td className="py-3 px-4">{appointment.vehicle}</td>
                  <td className="py-3 px-4">{appointment.service}</td>
                  <td className="py-3 px-4">
                    {new Date(appointment.date).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-3 px-4">{appointment.time}</td>
                  <td className="py-3 px-4">
                    R$ {(appointment.price ?? 0).toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    {editingId === appointment.id ? (
                      <select
                        defaultValue={appointment.status}
                        onChange={async (e) => {
                          const newStatus = e.target.value;
                          if (newStatus && newStatus !== appointment.status) {
                            await updateAppointmentStatus(appointment.id, newStatus);
                          }
                          setEditingId(null);
                        }}
                        onBlur={() => setEditingId(null)}
                        className="rounded-md border border-gray-300 py-1 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Confirmado">Confirmado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    ) : (
                      <button onClick={() => setEditingId(appointment.id)}>
                        <span 
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            appointment.status === 'Confirmado'
                              ? 'bg-green-100 text-green-800'
                              : appointment.status === 'Cancelado'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;
