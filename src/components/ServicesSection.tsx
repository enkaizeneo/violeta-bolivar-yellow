
import React from "react";
import { Smartphone, Laptop, Tv, Printer, Wifi, PlugZap } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-purple transition-all">
      <div className="w-16 h-16 bg-purple/10 rounded-full flex items-center justify-center text-purple mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="servicios" className="py-16 bg-gray-50 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestros <span className="text-purple">Servicios</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ofrecemos soluciones profesionales para una amplia gama de dispositivos electrónicos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Smartphone size={32} />}
            title="Reparación de Celulares"
            description="Soluciones para pantallas rotas, baterías, problemas de software y más para todas las marcas."
          />
          <ServiceCard
            icon={<Laptop size={32} />}
            title="Reparación de Laptops"
            description="Reparamos problemas de hardware y software, cambios de pantalla, teclados y discos duros."
          />
          <ServiceCard
            icon={<Tv size={32} />}
            title="Reparación de Televisores"
            description="Arreglamos problemas de imagen, sonido y electrónica en TVs LCD, LED y Smart TV."
          />
          <ServiceCard
            icon={<Printer size={32} />}
            title="Reparación de Impresoras"
            description="Mantenimiento y reparación de impresoras de inyección y láser de todas las marcas."
          />
          <ServiceCard
            icon={<Wifi size={32} />}
            title="Redes y Conectividad"
            description="Configuración y reparación de equipos de redes, routers y problemas de conectividad."
          />
          <ServiceCard
            icon={<PlugZap size={32} />}
            title="Instalación de Software"
            description="Instalación de sistemas operativos, programas, antivirus y respaldo de datos."
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
