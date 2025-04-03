import React, { useState } from 'react';
import { User, Car, Wrench, FileText, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Appointment: React.FC = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleYear: '',
    service: '',
    customService: '',
    notes: '',
  });

  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const serviceText = formData.service === 'Outro' ? formData.customService : formData.service;
    const message = `🚗 *Nova Solicitação de Serviço*\n\n` +
      `👤 *Cliente:* ${formData.clientName}\n\n` +
      `🚘 *Dados do Veículo:*\n` +
      `• Marca: ${formData.vehicleBrand}\n` +
      `• Modelo: ${formData.vehicleModel}\n` +
      `• Ano: ${formData.vehicleYear}\n\n` +
      `🔧 *Serviço Solicitado:* ${serviceText}\n\n` +
      `📝 *Observações:*\n${formData.notes || 'Nenhuma'}`;

    const whatsappUrl = `https://wa.me/5511967970445?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-6 px-4 sm:py-12"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-2 text-center">
            Agendar Serviço
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Preencha o formulário abaixo para enviar sua solicitação via WhatsApp.
          </p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 border border-white/20"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* Campos existentes com animações melhoradas */}
                {['clientName', 'vehicleBrand', 'vehicleModel', 'vehicleYear'].map((field) => (
                  <motion.div
                    key={field}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
                    >
                      {field.includes('vehicle') ? (
                        <Car size={18} className="mr-2 text-blue-600" />
                      ) : (
                        <User size={18} className="mr-2 text-blue-600" />
                      )}
                      {field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    <motion.input
                      type="text"
                      id={field}
                      name={field}
                      required
                      value={formData[field as keyof typeof formData]}
                      onChange={handleChange}
                      onFocus={() => setFocused(field)}
                      onBlur={() => setFocused(null)}
                      className={`w-full rounded-xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        focused === field ? 'ring-2 ring-blue-500 border-transparent scale-[1.02]' : ''
                      }`}
                      placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    />
                  </motion.div>
                ))}

                {/* Serviço com animação e campo personalizado */}
                <motion.div 
                  className="md:col-span-2"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Wrench size={18} className="mr-2 text-blue-600" />
                    Serviço
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white shadow-sm"
                  >
                    <option value="">Selecione um serviço</option>
                    <option value="Polimento">Polimento</option>
                    <option value="Funilaria">Funilaria</option>
                    <option value="Pintura">Pintura</option>
                    <option value="Outro">Outro</option>
                  </select>

                  {formData.service === 'Outro' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <input
                        type="text"
                        name="customService"
                        value={formData.customService}
                        onChange={handleChange}
                        placeholder="Descreva o serviço desejado"
                        className="w-full rounded-xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </motion.div>
                  )}
                </motion.div>

                {/* Observações com animação */}
                <motion.div 
                  className="md:col-span-2"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
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
              </div>

              <motion.div 
                className="flex justify-center pt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="submit"
                  className="group bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <span>Enviar via WhatsApp</span>
                  <Send size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Appointment;
