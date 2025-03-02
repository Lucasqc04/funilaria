import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import AppointmentTable from '../components/AppointmentTable';
import { Calendar, Clock, User, FileText, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { 
    appointments, 
    allAppointments, 
    loading, 
    error, 
    filters, 
    updateFilters, 
    updateAppointmentStatus 
  } = useDashboard();

  // Estatísticas dos agendamentos
  const confirmedAppointments = allAppointments.filter(app => app.status === 'Confirmado').length;
  const pendingAppointments = allAppointments.filter(app => app.status === 'Pendente').length;
  const canceledAppointments = allAppointments.filter(app => app.status === 'Cancelado').length;
  
  // Calcula a receita total a partir dos agendamentos confirmados
  const totalRevenue = allAppointments
    .filter(app => app.status === 'Confirmado')
    .reduce((sum, app) => sum + (app.price ?? 0), 0);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Bem-vindo(a) ao sistema de agendamentos da FunilaTOP.
          </p>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar size={24} className="text-blue-900" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total de Agendamentos</p>
                <p className="text-2xl font-bold text-blue-900">{allAppointments.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Clock size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Confirmados</p>
                <p className="text-2xl font-bold text-green-600">{confirmedAppointments}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <User size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingAppointments}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-3 rounded-full">
                <FileText size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Cancelados</p>
                <p className="text-2xl font-bold text-red-600">{canceledAppointments}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <DollarSign size={24} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Receita Confirmada</p>
                <p className="text-2xl font-bold text-indigo-600">R$ {totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Agendamentos */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Agendamentos</h2>
          <AppointmentTable 
            appointments={appointments}
            allAppointments={allAppointments}
            loading={loading}
            error={error}
            filters={filters}
            updateFilters={updateFilters}
            updateAppointmentStatus={updateAppointmentStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
