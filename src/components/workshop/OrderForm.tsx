
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import ClientSelector from './orders/ClientSelector';
import DeviceTypeSelector from './orders/DeviceTypeSelector';
import DeviceInfoFields from './orders/DeviceInfoFields';
import ProblemDescriptionFields from './orders/ProblemDescriptionFields';
import TechnicianSelector from './orders/TechnicianSelector';
import { OrderFormProps, OrderFormData } from './orders/types';

const OrderForm: React.FC<OrderFormProps> = ({ 
  onSubmit, 
  onCancel,
  initialData = {} 
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
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
        <ClientSelector 
          selectedClient={formData.client} 
          onClientChange={(value) => handleSelectChange('client', value)} 
        />

        <DeviceTypeSelector 
          deviceType={formData.deviceType} 
          onDeviceTypeChange={(value) => handleSelectChange('deviceType', value)} 
        />

        <DeviceInfoFields 
          brand={formData.brand}
          model={formData.model}
          serial={formData.serial}
          onFieldChange={handleChange}
        />

        <ProblemDescriptionFields 
          issue={formData.issue}
          observations={formData.observations}
          onFieldChange={handleChange}
        />

        <TechnicianSelector 
          selectedTechnician={formData.technician} 
          onTechnicianChange={(value) => handleSelectChange('technician', value)} 
        />
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
