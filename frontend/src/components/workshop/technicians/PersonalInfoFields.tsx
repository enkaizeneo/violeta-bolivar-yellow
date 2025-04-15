
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoFieldsProps {
  name: string;
  ci: string;
  email: string;
  phone: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({
  name,
  ci,
  email,
  phone,
  onChange
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Nombre Completo*</Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="ci">Cédula de Identidad*</Label>
          <Input
            id="ci"
            name="ci"
            value={ci}
            onChange={onChange}
            required
            className="mt-1"
            placeholder="V-12345678"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            name="phone"
            value={phone}
            onChange={onChange}
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
            value={email}
            onChange={onChange}
            className="mt-1"
          />
        </div>
      </div>
    </>
  );
};

export default PersonalInfoFields;
