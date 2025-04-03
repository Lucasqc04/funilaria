import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonial: React.FC = () => {
  return (
    <section className="bg-blue-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">
            Satisfação do Cliente
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>
          
          <motion.div 
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star size={28} className="text-yellow-400 fill-current mx-1" />
                </motion.div>
              ))}
            </div>
            
            <blockquote className="text-2xl text-center text-gray-700 italic mb-8">
              "Fiquei impressionado com o serviço da Sampaio Funilaria. Meu carro estava com vários amassados após um acidente, e eles conseguiram deixá-lo como novo. O atendimento foi excelente, o prazo foi cumprido e o preço foi justo."
            </blockquote>
            
            <div className="text-center">
              <p className="font-bold text-blue-900 text-xl">Carlos Oliveira</p>
              <p className="text-gray-600">Cliente desde 2022</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonial;