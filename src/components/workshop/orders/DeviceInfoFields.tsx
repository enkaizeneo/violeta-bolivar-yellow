
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DeviceInfoFieldsProps {
  brand: string;
  model: string;
  serial: string;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeviceInfoFields: React.FC<DeviceInfoFieldsProps> = ({
  brand,
  model,
  serial,
  onFieldChange
}) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="brand" className="text-right">
          Marca:
        </Label>
        <Input
          id="brand"
          name="brand"
          value={brand}
          onChange={onFieldChange}
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
          value={model}
          onChange={onFieldChange}
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
          value={serial}
          onChange={onFieldChange}
          className="col-span-3"
        />
      </div>
    </>
  );
};

export default DeviceInfoFields;
