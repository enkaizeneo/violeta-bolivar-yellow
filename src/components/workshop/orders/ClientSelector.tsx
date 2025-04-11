
import React from 'react';
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Client } from './types';

// Mock data
const MOCK_CLIENTS: Client[] = [
  { id: 1, name: "Juan Pérez", ci: "V-12345678" },
  { id: 2, name: "María López", ci: "V-23456789" },
  { id: 3, name: "Pedro Gomez", ci: "V-34567890" }
];

interface ClientSelectorProps {
  selectedClient: string;
  onClientChange: (value: string) => void;
}

const ClientSelector: React.FC<ClientSelectorProps> = ({
  selectedClient,
  onClientChange
}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="client" className="text-right">
        Cliente:
      </Label>
      <div className="col-span-3">
        <Select 
          onValueChange={onClientChange}
          defaultValue={selectedClient || undefined}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un cliente" />
          </SelectTrigger>
          <SelectContent>
            {MOCK_CLIENTS.map(client => (
              <SelectItem key={client.id} value={client.name}>
                {client.name} ({client.ci})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ClientSelector;
