
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import PersonalInfoFields from './technicians/PersonalInfoFields';
import SpecialtiesSelector from './technicians/SpecialtiesSelector';
import StatusSelector from './technicians/StatusSelector';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecialtiesChange = (specialties: string[]) => {
    setFormData(prev => ({ ...prev, specialties }));
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
        <PersonalInfoFields 
          name={formData.name}
          ci={formData.ci}
          email={formData.email}
          phone={formData.phone}
          onChange={handleChange}
        />
        
        <SpecialtiesSelector 
          specialties={formData.specialties}
          onSpecialtiesChange={handleSpecialtiesChange}
        />
        
        <StatusSelector 
          status={formData.status}
          onStatusChange={(value) => handleSelectChange('status', value)}
        />
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
