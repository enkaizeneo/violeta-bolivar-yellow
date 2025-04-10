
import React, { useState } from "react";
import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

// Tipo de cambio aproximado VES/USD
const exchangeRate = 36.5;

interface PricingPlanProps {
  title: string;
  description: string;
  price: number;
  features: string[];
  highlighted?: boolean;
  showUSD: boolean;
}

const PricingPlan = ({ title, description, price, features, highlighted = false, showUSD }: PricingPlanProps) => {
  const priceInVES = (price * exchangeRate).toFixed(2);
  
  return (
    <div className={`bg-white rounded-lg p-8 shadow-lg border ${highlighted ? 'border-purple' : 'border-gray-200'}`}>
      {highlighted && <div className="bg-purple text-white py-1 px-4 rounded-full inline-block mb-4">Más Popular</div>}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">Desde:</p>
        {showUSD ? (
          <>
            <p className="text-4xl font-bold mb-1">${price} <span className="text-sm">USD</span></p>
            <p className="text-gray-500">{priceInVES} VES</p>
          </>
        ) : (
          <>
            <p className="text-4xl font-bold mb-1">{priceInVES} <span className="text-sm">VES</span></p>
            <p className="text-gray-500">${price} USD</p>
          </>
        )}
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="text-green-500 mr-2 shrink-0 mt-1" size={18} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button className={`w-full ${highlighted ? 'bg-purple hover:bg-purple-light' : 'bg-gray-100 hover:bg-gray-200 text-gray-800 hover:text-gray-900'}`}>
        Solicitar Servicio
      </Button>
    </div>
  );
};

const PricingSection = () => {
  const [showUSD, setShowUSD] = useState(true);
  
  return (
    <section id="precios" className="py-16 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestros <span className="text-purple">Precios</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Ofrecemos tarifas competitivas para todos nuestros servicios de reparación.
          </p>
          
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setShowUSD(true)}
                className={`px-4 py-2 rounded-md ${showUSD ? 'bg-white shadow' : ''}`}
              >
                Mostrar en USD
              </button>
              <button
                onClick={() => setShowUSD(false)}
                className={`px-4 py-2 rounded-md ${!showUSD ? 'bg-white shadow' : ''}`}
              >
                Mostrar en VES
              </button>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="ml-2 text-gray-500 cursor-help">
                    <Info size={18} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tasa de cambio: 1 USD = {exchangeRate} VES</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingPlan
            title="Diagnóstico Básico"
            description="Para problemas simples que requieren una solución rápida"
            price={15}
            showUSD={showUSD}
            features={[
              "Revisión del dispositivo",
              "Diagnóstico del problema",
              "Informe detallado",
              "Presupuesto sin compromiso",
              "Tiempo de entrega: 24h"
            ]}
          />
          
          <PricingPlan
            title="Reparación Estándar"
            description="Para la mayoría de los problemas comunes en dispositivos"
            price={45}
            showUSD={showUSD}
            highlighted={true}
            features={[
              "Todo lo del plan básico",
              "Reemplazo de componentes",
              "Reparación de software",
              "Garantía de 2 meses",
              "Tiempo de entrega: 48h"
            ]}
          />
          
          <PricingPlan
            title="Reparación Avanzada"
            description="Para problemas complejos que requieren intervención especializada"
            price={85}
            showUSD={showUSD}
            features={[
              "Todo lo del plan estándar",
              "Reparación de placa base",
              "Recuperación de datos",
              "Garantía de 3 meses",
              "Soporte prioritario"
            ]}
          />
        </div>
        
        <div className="mt-12 bg-yellow-light border border-yellow p-6 rounded-lg">
          <p className="text-center text-lg">
            Todos los precios son aproximados y pueden variar según el modelo específico y el diagnóstico detallado. 
            <span className="font-bold"> Contacta con nosotros para un presupuesto personalizado.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
