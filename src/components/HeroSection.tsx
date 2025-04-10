
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="inicio" className="py-16 md:py-24 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-purple">Soluciones</span> profesionales para tus equipos electrónicos
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Ofrecemos servicios de reparación y mantenimiento de la más alta calidad para tus dispositivos electrónicos. Expertos certificados y precios competitivos en bolivares y dólares.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-purple hover:bg-purple-light text-white text-lg py-6 px-8">
                Solicitar Presupuesto
              </Button>
              <Button variant="outline" className="border-purple text-purple hover:bg-purple/10 text-lg py-6 px-8 flex items-center gap-2">
                Ver Servicios <ArrowRight size={18} />
              </Button>
            </div>
          </div>
          <div className="bg-yellow-light rounded-lg p-8 border-2 border-yellow shadow-xl">
            <div className="bg-white rounded-lg p-6 shadow-inner">
              <h3 className="text-2xl font-bold text-purple mb-6 text-center">Orden de Reparación</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-900">Diagnóstico Gratuito</p>
                  <p className="text-gray-600">Evaluación del problema sin costo</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-900">Reparación Garantizada</p>
                  <p className="text-gray-600">Hasta 3 meses de garantía</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-900">Tiempo de Entrega</p>
                  <p className="text-gray-600">24-72 horas (según dispositivo)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
