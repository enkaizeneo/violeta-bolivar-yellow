
import React from 'react';
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Technician } from './types';

// Mock data
const MOCK_TECHNICIANS: Technician[] = [
  { id: 1, name: "Carlos Rodriguez" },
  { id: 2, name: "Ana Martinez" },
  { id: 3, name: "José Sánchez" }
];

interface TechnicianSelectorProps {
  selectedTechnician: string;
  onTechnicianChange: (value: string) => void;
}

const TechnicianSelector: React.FC<TechnicianSelectorProps> = ({
  selectedTechnician,
  onTechnicianChange
}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="technician" className="text-right">
        Técnico Asignado:
      </Label>
      <div className="col-span-3">
        <Select 
          onValueChange={onTechnicianChange}
          defaultValue={selectedTechnician || undefined}
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
  );
};

export default TechnicianSelector;
