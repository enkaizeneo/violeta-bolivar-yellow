
import React from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const ContactForm = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Formulario enviado",
      description: "Nos pondremos en contacto contigo lo antes posible.",
    });
  };

  return (
    <section id="contacto" className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-purple">Contáctanos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Envíanos tu consulta o solicita una orden de reparación.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6">Envíanos tu consulta</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nombre completo
                  </label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    placeholder="Tu número de teléfono"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Correo electrónico
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Tu correo electrónico"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="device" className="text-sm font-medium">
                  Tipo de dispositivo
                </label>
                <Input
                  id="device"
                  placeholder="Ej: iPhone 13, HP Laptop, etc."
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Descripción del problema
                </label>
                <Textarea
                  id="message"
                  placeholder="Describe el problema que presenta tu dispositivo"
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-purple hover:bg-purple-light flex items-center justify-center gap-2">
                <Send size={18} />
                Enviar Solicitud
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-between">
            <div className="bg-purple text-white p-8 rounded-lg shadow-md mb-6">
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="mr-4 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Teléfono</p>
                    <p>+58 412-555-9876</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="mr-4 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Correo</p>
                    <p>info@ordendereparacion.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-4 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Dirección</p>
                    <p>Av. Principal de Los Palos Grandes,<br />Caracas, Venezuela</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-light p-8 rounded-lg border border-yellow">
              <h3 className="text-xl font-bold mb-4">Horario de Atención</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Lunes a Viernes</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sábados</span>
                  <span>9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Domingos</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
