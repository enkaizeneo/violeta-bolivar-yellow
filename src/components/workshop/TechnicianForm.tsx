
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Datos de ejemplo
const SPECIALTY_OPTIONS = [
  "Laptops",
  "Computadoras de Escritorio",
  "Smartphones",
  "Tablets",
  "Impresoras",
  "Escáneres",
  "Redes",
  "Servidores",
  "Software",
  "Hardware",
  "Electrónica",
  "Otro"
];

interface TechnicianFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const TechnicianForm: React.FC<TechnicianFormProps> = ({ 
  onSubmit, 
  onCancel,
  initialData = {} 
}) => {
  const [formData, setFormData] = useState({
    id: initialData.id || undefined,
    name: initialData.name || '',
    ci: initialData.ci || '',
    specialties: initialData.specialties || [],
    phone: initialData.phone || '',
    email: initialData.email || '',
    status: initialData.status || 'Activo',
    orders: initialData.orders !== undefined ? initialData.orders : 0,
    rating: initialData.rating !== undefined ? initialData.rating : 0
  });
  const [newSpecialty, setNewSpecialty] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSpecialty = () => {
    if (!newSpecialty) return;
    if (formData.specialties.includes(newSpecialty)) return;
    
    setFormData(prev => ({
      ...prev,
      specialties: [...prev.specialties, newSpecialty]
    }));
    setNewSpecialty('');
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(item => item !== specialty)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que los campos requeridos no estén vacíos
    if (!formData.name || !formData.ci) return;
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name">Nombre Completo*</Label>
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
            <Label htmlFor="ci">Cédula de Identidad*</Label>
            <Input
              id="ci"
              name="ci"
              value={formData.ci}
              onChange={handleChange}
              required
              className="mt-1"
              placeholder="V-12345678"
            />
          </div>
        </div>
        
        <div>
          <Label>Especialidades</Label>
          <div className="flex flex-wrap gap-2 mt-2 mb-2">
            {formData.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="pl-2 pr-1 py-1 flex items-center">
                {specialty}
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-5 w-5 p-0 ml-1 hover:bg-transparent"
                  onClick={() => handleRemoveSpecialty(specialty)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Select 
              onValueChange={setNewSpecialty}
              value={newSpecialty}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Seleccionar especialidad" />
              </SelectTrigger>
              <SelectContent>
                {SPECIALTY_OPTIONS.map(option => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              type="button" 
              onClick={handleAddSpecialty}
              disabled={!newSpecialty}
            >
              <Plus className="h-4 w-4" />
              Agregar
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
      <DialogFooter>
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button 
          type="submit"
          disabled={!formData.name || !formData.ci}
        >
          {initialData.id ? 'Actualizar' : 'Guardar'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default TechnicianForm;
