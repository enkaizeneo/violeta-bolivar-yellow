
import React from "react";
import { Facebook, Instagram, Twitter, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-purple text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-yellow">Neo</span>Sis
            </h3>
            <p className="mb-4 text-purple-light">
              Somos expertos en reparación y mantenimiento de equipos electrónicos con años de experiencia en el sector.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-purple-light hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-purple-light hover:text-white transition-colors">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#precios" className="text-purple-light hover:text-white transition-colors">
                  Precios
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-purple-light hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-purple-light hover:text-white transition-colors">
                  Reparación de Celulares
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-light hover:text-white transition-colors">
                  Reparación de Laptops
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-light hover:text-white transition-colors">
                  Reparación de Televisores
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-light hover:text-white transition-colors">
                  Soporte Técnico
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} NeoSis. Todos los derechos reservados.</p>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
