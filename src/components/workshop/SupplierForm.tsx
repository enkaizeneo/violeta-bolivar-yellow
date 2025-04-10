
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SupplierFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const SupplierForm: React.FC<SupplierFormProps> = ({ 
  onSubmit, 
  onCancel,
  initialData = {} 
}) => {
  const [formData, setFormData] = useState({
    id: initialData.id || undefined,
    name: initialData.name || '',
    rif: initialData.rif || '',
    contact: initialData.contact || '',
    phone: initialData.phone || '',
    email: initialData.email || '',
    address: initialData.address || '',
    notes: initialData.notes || '',
    status: initialData.status || 'Activo',
    products: initialData.products !== undefined ? initialData.products : 0
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
    
    // Validar que los campos requeridos no estén vacíos
    if (!formData.name || !formData.rif) return;
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name">Nombre del Proveedor*</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="rif">RIF*</Label>
            <Input
              id="rif"
              name="rif"
              value={formData.rif}
              onChange={handleChange}
              required
              className="mt-1"
              placeholder="J-12345678-9"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="contact">Persona de Contacto</Label>
            <Input
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1"
              placeholder="+58 412 123 4567"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="status">Estado</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('status', value)}
              defaultValue={formData.status}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Activo">Activo</SelectItem>
                <SelectItem value="Inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="notes">Notas Adicionales</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="mt-1"
            placeholder="Información adicional sobre el proveedor..."
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button 
          type="submit"
          disabled={!formData.name || !formData.rif}
        >
          {initialData.id ? 'Actualizar' : 'Guardar'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default SupplierForm;
