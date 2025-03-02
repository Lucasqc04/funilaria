import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-blue-900 text-white">
      <div className="h-[500px] bg-gray-300 flex items-center justify-center">
        <div className="text-gray-500 text-center p-4">
          <p className="font-medium text-2xl">coloque foto aqui</p>
          <p className="text-sm mt-2">(Banner principal da funilaria)</p>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-90 flex items-center">
        <div className="container mx-auto px-4 py-16 mt-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Qualidade e Excelência em Funilaria e Pintura
            </h1>
            <p className="text-xl mb-8">
              Transformamos seu veículo com os melhores serviços de funilaria e pintura da região.
              Atendimento personalizado e resultados impecáveis.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/agendar" 
                className="bg-white text-blue-900 hover:bg-blue-100 px-6 py-3 rounded-md font-semibold transition-colors"
              >
                Agendar Serviço
              </Link>
              <a 
                href="#services" 
                className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-md font-semibold transition-colors"
              >
                Nossos Serviços
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;