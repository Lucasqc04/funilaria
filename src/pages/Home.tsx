import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import Testimonial from '../components/Testimonial';
import { Wrench,   Clock, Trophy, Phone } from 'lucide-react';

const Home: React.FC = () => {
  const services = [
    {
      id: 1,
      title: 'Polimento de Carro Pequeno',
      description: 'Polimento completo para carros de pequeno porte, removendo riscos superficiais e devolvendo o brilho original à pintura.',
      imageUrl: "/capturar_fusca.png"  // Imagem na pasta public
    },
    {
      id: 2,
      title: 'Polimento de Carro Grande',
      description: 'Serviço de polimento especializado para veículos de grande porte, com tratamento detalhado para cada área da carroceria.',
      imageUrl: "/Capturar3carro_grande.PNG"  // Imagem na pasta public
    },
    {
      id: 3,
      title: 'Funilaria Completa',
      description: 'Reparos estruturais e estéticos para veículos com danos mais severos, incluindo substituição de peças e alinhamento.',
      imageUrl: "/capturar_fusca.png"  // Imagem na pasta public
    },
    {
      id: 4,
      title: 'Reparo de Amassados',
      description: 'Técnica especializada para remoção de amassados sem afetar a pintura original do veículo, ideal para pequenos danos.',
      imageUrl: "/Capturar3carro_grande.PNG"  // Imagem na pasta public
    },
    {
      id: 5,
      title: 'Pintura Parcial',
      description: 'Serviço de pintura para partes específicas do veículo, garantindo perfeita combinação com a cor original.',
      imageUrl: "/capturar_fusca.png"  // Imagem na pasta public
    },
    {
      id: 6,
      title: 'Pintura Completa',
      description: 'Renovação total da pintura do veículo, incluindo preparação da superfície, aplicação de primer e acabamento de alta qualidade.',
      imageUrl: "/Capturar3carro_grande.PNG"  // Imagem na pasta public
    }
  ];

  
  return (
    <main className="overflow-x-hidden">
      <Hero />
      
      {/* Services Section */}
      <section id="services" className="py-20">
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">
            Nossos Serviços
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16">
            Oferecemos uma ampla gama de serviços de funilaria e pintura para atender às necessidades do seu veículo.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ServiceCard 
                  title={service.title}
                  description={service.description}
                  imageUrl={service.imageUrl}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center text-white"
              whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">15+</div>
              <div className="text-xl">Anos de Experiência</div>
            </motion.div>
            <motion.div
              className="text-center text-white"
              whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">2000+</div>
              <div className="text-xl">Clientes Satisfeitos</div>
            </motion.div>
            <motion.div
              className="text-center text-white"
              whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">5000+</div>
              <div className="text-xl">Serviços Realizados</div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Service Description with Animation */}
      <section className="py-20 bg-blue-900 text-white">
        <motion.div 
          className="container mx-auto px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-16">
            Por que nos escolher?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: <Wrench size={24} />, title: 'Profissionais Especializados', text: 'Nossa equipe é altamente treinada e certificada.' },
              { icon: <Clock size={24} />, title: 'Agilidade', text: 'Entrega rápida sem comprometer a qualidade.' },
              { icon: <Trophy size={24} />, title: 'Qualidade Garantida', text: 'Garantia em todos os serviços realizados.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-blue-800/50 p-6 rounded-lg hover:bg-blue-800 transition-all duration-300"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-blue-700 p-3 rounded-lg w-fit mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-50">
        <motion.div 
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            Pronto para transformar seu veículo?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco hoje mesmo e faça um orçamento gratuito.
          </p>
          <motion.button
            className="bg-blue-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center mx-auto space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone size={20} />
            <span>Agende uma Avaliação</span>
          </motion.button>
        </motion.div>
      </section>
      
      <Testimonial />
    </main>
  );
};

export default Home;
