import React from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import Testimonial from '../components/Testimonial';
import { Wrench, Paintbrush, Car, Shield } from 'lucide-react';

const Home: React.FC = () => {
  const services = [
    {
      id: 1,
      title: 'Polimento de Carro Pequeno',
      description: 'Polimento completo para carros de pequeno porte, removendo riscos superficiais e devolvendo o brilho original à pintura.',
    },
    {
      id: 2,
      title: 'Polimento de Carro Grande',
      description: 'Serviço de polimento especializado para veículos de grande porte, com tratamento detalhado para cada área da carroceria.',
    },
    {
      id: 3,
      title: 'Funilaria Completa',
      description: 'Reparos estruturais e estéticos para veículos com danos mais severos, incluindo substituição de peças e alinhamento.',
    },
    {
      id: 4,
      title: 'Reparo de Amassados',
      description: 'Técnica especializada para remoção de amassados sem afetar a pintura original do veículo, ideal para pequenos danos.',
    },
    {
      id: 5,
      title: 'Pintura Parcial',
      description: 'Serviço de pintura para partes específicas do veículo, garantindo perfeita combinação com a cor original.',
    },
    {
      id: 6,
      title: 'Pintura Completa',
      description: 'Renovação total da pintura do veículo, incluindo preparação da superfície, aplicação de primer e acabamento de alta qualidade.',
    }
  ];

  return (
    <main>
      <Hero />
      
      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Oferecemos uma ampla gama de serviços de funilaria e pintura para atender às necessidades do seu veículo.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard 
                key={service.id}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Service Description */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Descrição dos Serviços
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-800 p-3 rounded-lg">
                  <Wrench size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Funilaria Profissional</h3>
                  <p>
                    Nossa equipe de funileiros altamente qualificados utiliza técnicas modernas e equipamentos de ponta para reparar amassados, trincas e outros danos à carroceria do seu veículo. Trabalhamos com todos os tipos de materiais, garantindo um acabamento perfeito.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-800 p-3 rounded-lg">
                  <Paintbrush size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Pintura Automotiva</h3>
                  <p>
                    Utilizamos tintas de alta qualidade e cabines de pintura modernas para garantir um acabamento impecável. Nossa equipe é especializada em combinar cores com precisão, assegurando que os reparos sejam imperceptíveis.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-800 p-3 rounded-lg">
                  <Car size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Polimento e Cristalização</h3>
                  <p>
                    Devolvemos o brilho original à pintura do seu veículo com nossos serviços de polimento e cristalização. Removemos riscos superficiais, manchas e imperfeições, deixando seu carro com aparência de novo.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-800 p-3 rounded-lg">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Garantia de Qualidade</h3>
                  <p>
                    Todos os nossos serviços possuem garantia. Utilizamos materiais de primeira linha e técnicas avançadas para assegurar a durabilidade e qualidade dos reparos realizados em seu veículo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Testimonial />
    </main>
  );
};

export default Home;