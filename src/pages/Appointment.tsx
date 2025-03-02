import React from 'react';
import { Calendar, Clock, User, Phone, Car, Wrench, DollarSign, FileText } from 'lucide-react';
import { useAppointmentForm } from '../hooks/useAppointmentForm';

const Appointment: React.FC = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    success,
    errorMessage,
    availableTimes,
    minDate,
    services,
    bookedTimes
  } = useAppointmentForm();

  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Agendamento Realizado com Sucesso!</h2>
              <p className="text-gray-600 mb-6">
                Obrigado por agendar seu serviço conosco. Em breve entraremos em contato para confirmar os detalhes.
              </p>
              <p className="text-sm text-gray-500">Redirecionando para a página inicial...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-900 mb-2 text-center">Agendar Serviço</h1>
          <p className="text-gray-600 text-center mb-8">
            Preencha o formulário abaixo para agendar seu serviço na FunilaTOP
          </p>
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Nome Completo */}
                <div>
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <User size={16} className="mr-1" />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    required
                    value={formData.clientName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Seu nome completo"
                  />
                </div>
                {/* Telefone / WhatsApp */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Phone size={16} className="mr-1" />
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                {/* Veículo: Marca */}
                <div>
                  <label htmlFor="vehicleBrand" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Car size={16} className="mr-1" />
                    Marca
                  </label>
                  <input
                    type="text"
                    id="vehicleBrand"
                    name="vehicleBrand"
                    required
                    value={formData.vehicleBrand}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Marca"
                  />
                </div>
                {/* Veículo: Modelo */}
                <div>
                  <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Car size={16} className="mr-1" />
                    Modelo
                  </label>
                  <input
                    type="text"
                    id="vehicleModel"
                    name="vehicleModel"
                    required
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Modelo"
                  />
                </div>
                {/* Veículo: Ano */}
                <div>
                  <label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Car size={16} className="mr-1" />
                    Ano
                  </label>
                  <input
                    type="text"
                    id="vehicleYear"
                    name="vehicleYear"
                    required
                    value={formData.vehicleYear}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ano"
                  />
                </div>
                {/* Veículo: Cor */}
                <div>
                  <label htmlFor="vehicleColor" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Car size={16} className="mr-1" />
                    Cor
                  </label>
                  <input
                    type="text"
                    id="vehicleColor"
                    name="vehicleColor"
                    required
                    value={formData.vehicleColor}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Cor"
                  />
                </div>
                {/* Serviço */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Wrench size={16} className="mr-1" />
                    Serviço
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {services.map(service => (
                      <option key={service.id} value={service.name}>
                        {service.name} (R$ {service.price.toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>
                {/* Preço (somente leitura) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <DollarSign size={16} className="mr-1" />
                    Preço
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={`R$ ${formData.price.toFixed(2)}`}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 bg-gray-100"
                  />
                </div>
                {/* Data */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Calendar size={16} className="mr-1" />
                    Data
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    min={minDate}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {/* Horário */}
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Clock size={16} className="mr-1" />
                    Horário
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Selecione um horário</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time} disabled={bookedTimes.includes(time)}>
                        {time} {bookedTimes.includes(time) ? ' - Indisponível' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Observações */}
              <div className="mb-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FileText size={16} className="mr-1" />
                  Observações (opcional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Informações adicionais sobre o serviço..."
                ></textarea>
              </div>
              {/* Informações de Pagamento */}
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <h3 className="text-sm font-medium text-blue-900 mb-2 flex items-center">
                  <DollarSign size={16} className="mr-1" />
                  Informações de Pagamento
                </h3>
                <p className="text-sm text-blue-800">
                  O pagamento será feito presencialmente após a realização do serviço. Aceitamos dinheiro, PIX, cartões de crédito e débito.
                </p>
              </div>
              {/* Mensagem de erro */}
              {errorMessage && (
                <div className="mb-4 text-red-600 text-center">{errorMessage}</div>
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 transition-colors"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processando...
                    </span>
                  ) : (
                    'Confirmar Agendamento'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
