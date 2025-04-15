
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

interface SpecialtiesSelectorProps {
  specialties: string[];
  onSpecialtiesChange: (specialties: string[]) => void;
}

const SpecialtiesSelector: React.FC<SpecialtiesSelectorProps> = ({ 
  specialties,
  onSpecialtiesChange
}) => {
  const [newSpecialty, setNewSpecialty] = useState('');

  const handleAddSpecialty = () => {
    if (!newSpecialty) return;
    if (specialties.includes(newSpecialty)) return;
    
    onSpecialtiesChange([...specialties, newSpecialty]);
    setNewSpecialty('');
  };

  const handleRemoveSpecialty = (specialty: string) => {
    onSpecialtiesChange(specialties.filter(item => item !== specialty));
  };

  return (
    <div>
      <Label>Especialidades</Label>
      <div className="flex flex-wrap gap-2 mt-2 mb-2">
        {specialties.map((specialty, index) => (
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
  );
};

export default SpecialtiesSelector;
