import React from 'react';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">FunilaTOP</h3>
            <p className="mb-4">
              Especialistas em funilaria e pintura automotiva, oferecendo serviços de alta qualidade desde 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <span>(11) 9999-8888</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <span>contato@funilatop.com.br</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Av. das Oficinas, 1234 - São Paulo, SP</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Segunda - Sexta:</span>
                <span>8:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sábado:</span>
                <span>8:00 - 13:00</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo:</span>
                <span>Fechado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} FunilaTOP. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;