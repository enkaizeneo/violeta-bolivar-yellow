
import React from 'react';
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusSelectorProps {
  status: string;
  onStatusChange: (value: string) => void;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({
  status,
  onStatusChange
}) => {
  return (
    <div>
      <Label htmlFor="status">Estado</Label>
      <Select 
        onValueChange={onStatusChange}
        defaultValue={status}
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
  );
};

export default StatusSelector;
