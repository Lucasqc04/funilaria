import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car, User, Calendar } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Car size={28} className="text-white" />
            <span className="text-xl font-bold">FunilaTOP</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link 
              to="/" 
              className={`hover:text-blue-300 transition-colors ${location.pathname === '/' ? 'font-bold' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/agendar" 
              className={`hover:text-blue-300 transition-colors ${location.pathname === '/agendar' ? 'font-bold' : ''}`}
            >
              <span className="flex items-center">
                <Calendar size={18} className="mr-1" />
                Agendar Serviço
              </span>
            </Link>
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`hover:text-blue-300 transition-colors ${location.pathname === '/dashboard' ? 'font-bold' : ''}`}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-1 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition-colors"
              >
                <User size={18} />
                <span>Área Restrita</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col space-y-4 pb-4">
            <Link 
              to="/" 
              className={`hover:text-blue-300 transition-colors ${location.pathname === '/' ? 'font-bold' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/agendar" 
              className={`hover:text-blue-300 transition-colors ${location.pathname === '/agendar' ? 'font-bold' : ''}`}
              onClick={closeMenu}
            >
              <span className="flex items-center">
                <Calendar size={18} className="mr-1" />
                Agendar Serviço
              </span>
            </Link>
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`hover:text-blue-300 transition-colors ${location.pathname === '/dashboard' ? 'font-bold' : ''}`}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition-colors text-left"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-1 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition-colors w-fit"
                onClick={closeMenu}
              >
                <User size={18} />
                <span>Área Restrita</span>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;