
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export interface Client {
  id: number;
  name: string;
  ci: string;
  email: string;
  phone: string;
  address: string;
}

interface ClientFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (client: Omit<Client, 'id'>) => void;
  client?: Client;
}

const ClientForm: React.FC<ClientFormProps> = ({
  open,
  onClose,
  onSave,
  client
}) => {
  const [name, setName] = useState(client?.name || '');
  const [ci, setCi] = useState(client?.ci || '');
  const [email, setEmail] = useState(client?.email || '');
  const [phone, setPhone] = useState(client?.phone || '');
  const [address, setAddress] = useState(client?.address || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !ci.trim()) {
      toast.error("Nombre y CI son obligatorios");
      return;
    }
    
    onSave({
      name,
      ci,
      email,
      phone,
      address
    });
    
    // Reset form
    setName('');
    setCi('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {client ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
          </SheetTitle>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del cliente"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ci">Cédula de Identidad</Label>
            <Input
              id="ci"
              value={ci}
              onChange={(e) => setCi(e.target.value)}
              placeholder="V-12345678"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="cliente@ejemplo.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+58 4XX-XXXXXXX"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Dirección del cliente"
            />
          </div>
          
          <SheetFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ClientForm;
