import React from 'react';
import { Star } from 'lucide-react';

const Testimonial: React.FC = () => {
  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
          Satisfação do Cliente
        </h2>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} className="text-yellow-400 fill-current" />
            ))}
          </div>
          
          <blockquote className="text-xl text-center text-gray-700 italic mb-6">
            "Fiquei impressionado com o serviço da Sampaio Funilaria. Meu carro estava com vários amassados após um acidente, e eles conseguiram deixá-lo como novo. O atendimento foi excelente, o prazo foi cumprido e o preço foi justo. Recomendo a todos que precisam de serviços de funilaria de qualidade."
          </blockquote>
          
          <div className="text-center">
            <p className="font-bold text-blue-900">Carlos Oliveira</p>
            <p className="text-gray-600">Cliente desde 2022</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;