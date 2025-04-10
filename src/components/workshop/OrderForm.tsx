
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";

// Datos de ejemplo
const MOCK_CLIENTS = [
  { id: 1, name: "Juan Pérez", ci: "V-12345678" },
  { id: 2, name: "María López", ci: "V-23456789" },
  { id: 3, name: "Pedro Gomez", ci: "V-34567890" }
];

const MOCK_TECHNICIANS = [
  { id: 1, name: "Carlos Rodriguez" },
  { id: 2, name: "Ana Martinez" },
  { id: 3, name: "José Sánchez" }
];

const DEVICE_TYPES = [
  "Laptop", "Computadora de Escritorio", "Tablet", "Smartphone", 
  "Impresora", "Monitor", "Otro"
];

interface OrderFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const OrderForm: React.FC<OrderFormProps> = ({ 
  onSubmit, 
  onCancel,
  initialData = {} 
}) => {
  const [formData, setFormData] = useState({
    client: initialData.client || '',
    deviceType: initialData.deviceType || '',
    brand: initialData.brand || '',
    model: initialData.model || '',
    serial: initialData.serial || '',
    issue: initialData.issue || '',
    observations: initialData.observations || '',
    technician: initialData.technician || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="client" className="text-right">
            Cliente:
          </Label>
          <div className="col-span-3">
            <Select 
              onValueChange={(value) => handleSelectChange('client', value)}
              defaultValue={formData.client || undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un cliente" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_CLIENTS.map(client => (
                  <SelectItem key={client.id} value={client.name}>
                    {client.name} ({client.ci})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="deviceType" className="text-right">
            Tipo de Dispositivo:
          </Label>
          <div className="col-span-3">
            <Select 
              onValueChange={(value) => handleSelectChange('deviceType', value)}
              defaultValue={formData.deviceType || undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione tipo de dispositivo" />
              </SelectTrigger>
              <SelectContent>
                {DEVICE_TYPES.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="brand" className="text-right">
            Marca:
          </Label>
          <Input
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="model" className="text-right">
            Modelo:
          </Label>
          <Input
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="serial" className="text-right">
            Serial:
          </Label>
          <Input
            id="serial"
            name="serial"
            value={formData.serial}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="issue" className="text-right">
            Problema:
          </Label>
          <Textarea
            id="issue"
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            className="col-span-3"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="observations" className="text-right">
            Observaciones:
          </Label>
          <Textarea
            id="observations"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            className="col-span-3"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="technician" className="text-right">
            Técnico Asignado:
          </Label>
          <div className="col-span-3">
            <Select 
              onValueChange={(value) => handleSelectChange('technician', value)}
              defaultValue={formData.technician || undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Asignar técnico" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_TECHNICIANS.map(tech => (
                  <SelectItem key={tech.id} value={tech.name}>
                    {tech.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </DialogFooter>
    </form>
  );
};

export default OrderForm;
