
import React from 'react';
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Device types
const DEVICE_TYPES = [
  "Laptop", "Computadora de Escritorio", "Tablet", "Smartphone", 
  "Impresora", "Monitor", "Otro"
];

interface DeviceTypeSelectorProps {
  deviceType: string;
  onDeviceTypeChange: (value: string) => void;
}

const DeviceTypeSelector: React.FC<DeviceTypeSelectorProps> = ({
  deviceType,
  onDeviceTypeChange
}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="deviceType" className="text-right">
        Tipo de Dispositivo:
      </Label>
      <div className="col-span-3">
        <Select 
          onValueChange={onDeviceTypeChange}
          defaultValue={deviceType || undefined}
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
  );
};

export default DeviceTypeSelector;
