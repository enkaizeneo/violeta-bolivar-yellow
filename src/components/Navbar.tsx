
import React, { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white py-4 px-6 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-purple">
              <span className="text-yellow">Orden</span>DeReparación
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-purple font-medium">
              Inicio
            </a>
            <a href="#servicios" className="text-gray-700 hover:text-purple font-medium">
              Servicios
            </a>
            <a href="#precios" className="text-gray-700 hover:text-purple font-medium">
              Precios
            </a>
            <a href="#contacto" className="text-gray-700 hover:text-purple font-medium">
              Contacto
            </a>
            <Button className="bg-purple hover:bg-purple-light text-white flex items-center gap-2">
              <Phone size={16} />
              <span>Solicitar Servicio</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a
                href="#inicio"
                className="text-gray-700 hover:text-purple font-medium py-2"
                onClick={toggleMenu}
              >
                Inicio
              </a>
              <a
                href="#servicios"
                className="text-gray-700 hover:text-purple font-medium py-2"
                onClick={toggleMenu}
              >
                Servicios
              </a>
              <a
                href="#precios"
                className="text-gray-700 hover:text-purple font-medium py-2"
                onClick={toggleMenu}
              >
                Precios
              </a>
              <a
                href="#contacto"
                className="text-gray-700 hover:text-purple font-medium py-2"
                onClick={toggleMenu}
              >
                Contacto
              </a>
              <Button className="bg-purple hover:bg-purple-light text-white flex items-center justify-center gap-2">
                <Phone size={16} />
                <span>Solicitar Servicio</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
