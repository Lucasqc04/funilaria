import React, { useState } from 'react';
import { User, Car, Wrench, FileText, ChevronDown } from 'lucide-react';
import { useAppointmentForm } from '../hooks/useAppointmentForm';
import { motion } from 'framer-motion';

const Appointment: React.FC = () => {
  const { formData, handleChange, services } = useAppointmentForm();
  const [showOtherService, setShowOtherService] = useState(false);
  const [customService, setCustomService] = useState('');

  const filteredServices = [
    ...services.reduce((acc, service) => {
      if (service.name.toLowerCase().includes('polimento')) {
        if (!acc.has('polimento')) {
          acc.set('polimento', { id: 'polimento', name: 'Polimento' });
        }
      } else {
        acc.set(service.id, { id: service.id, name: service.name });
      }
      return acc;
    }, new Map()).values(),
    { id: 'outro', name: 'Outro Serviço' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceText = showOtherService ? customService : formData.service;
    const message = `Olá, meu nome é ${formData.clientName}. Gostaria de realizar um orçamento referente ao meu carro ${formData.vehicleBrand} ${formData.vehicleModel} (${formData.vehicleYear}) para o serviço de ${serviceText}. Observações: ${formData.notes || 'Nenhuma'}.`;

    const whatsappUrl = `https://wa.me/5511967970445?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-6 px-4 sm:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-4xl"
      >
        <div className="max-w-3xl mx-auto">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl font-bold text-blue-900 mb-2 text-center"
          >
            Agendar Serviço
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-center mb-8"
          >
            Preencha o formulário abaixo para agendar seu serviço na Sampaio Funilaria
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 border border-white/20"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* Nome Completo */}
                <motion.div whileHover={{ scale: 1.01 }} className="transition-all duration-200">
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <User size={18} className="mr-2 text-blue-600" />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    required
                    value={formData.clientName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Seu nome completo"
                  />
                </motion.div>

                {/* Veículo: Marca */}
                <motion.div whileHover={{ scale: 1.01 }} className="transition-all duration-200">
                  <label htmlFor="vehicleBrand" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Car size={18} className="mr-2 text-blue-600" />
                    Marca
                  </label>
                  <input
                    type="text"
                    id="vehicleBrand"
                    name="vehicleBrand"
                    required
                    value={formData.vehicleBrand}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Marca"
                  />
                </motion.div>

                {/* Veículo: Modelo */}
                <motion.div whileHover={{ scale: 1.01 }} className="transition-all duration-200">
                  <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Car size={18} className="mr-2 text-blue-600" />
                    Modelo
                  </label>
                  <input
                    type="text"
                    id="vehicleModel"
                    name="vehicleModel"
                    required
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Modelo"
                  />
                </motion.div>

                {/* Veículo: Ano */}
                <motion.div whileHover={{ scale: 1.01 }} className="transition-all duration-200">
                  <label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Car size={18} className="mr-2 text-blue-600" />
                    Ano
                  </label>
                  <input
                    type="text"
                    id="vehicleYear"
                    name="vehicleYear"
                    required
                    value={formData.vehicleYear}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ano"
                  />
                </motion.div>

                {/* Serviço - Updated version */}
                <motion.div 
                  whileHover={{ scale: 1.01 }} 
                  className="transition-all duration-200 md:col-span-2"
                >
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Wrench size={18} className="mr-2 text-blue-600" />
                    Serviço
                  </label>
                  <div className="relative">
                    <select
                      id="service"
                      name="service"
                      required={!showOtherService}
                      value={formData.service}
                      onChange={(e) => {
                        const isOther = e.target.value === 'Outro Serviço';
                        setShowOtherService(isOther);
                        if (!isOther) {
                          handleChange(e);
                          setCustomService('');
                        }
                      }}
                      className="w-full rounded-xl border border-gray-300 py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white shadow-sm"
                    >
                      <option value="">Selecione um serviço</option>
                      {filteredServices.map(service => (
                        <option key={service.id} value={service.name}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  
                  {showOtherService && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3"
                    >
                      <input
                        type="text"
                        name="customService"
                        required
                        value={customService}
                        onChange={(e) => {
                          setCustomService(e.target.value);
                          handleChange({
                            ...e,
                            target: {
                              ...e.target,
                              name: 'service',
                              value: e.target.value
                            }
                          });
                        }}
                        className="w-full rounded-xl border border-gray-300 py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        placeholder="Descreva o serviço desejado"
                      />
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Observações - Updated version */}
              <motion.div 
                whileHover={{ scale: 1.01 }} 
                className="transition-all duration-200 md:col-span-2"
              >
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FileText size={18} className="mr-2 text-blue-600" />
                  Observações (opcional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none shadow-sm"
                  placeholder="Informações adicionais sobre o serviço..."
                ></textarea>
              </motion.div>

              <motion.div 
                className="flex justify-center pt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto"
                >
                  Confirmar Agendamento
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Appointment;
