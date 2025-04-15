
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <ContactForm />
        
        {/* Botón de acceso al sistema */}
        <div className="w-full bg-purple/10 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Accede a Nuestro Sistema</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Gestiona tus órdenes de reparación, sigue el estado de tus dispositivos y accede a todos nuestros servicios.
            </p>
            <Link to="/login">
              <Button size="lg" className="bg-purple hover:bg-purple-light">
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
