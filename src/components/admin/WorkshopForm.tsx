
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export interface Workshop {
  id: number;
  name: string;
  location: string;
  status: "active" | "pending" | "inactive";
  registrationDate: string;
}

interface WorkshopFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (workshop: Omit<Workshop, 'id' | 'registrationDate'>) => void;
  workshop?: Workshop;
}

const WorkshopForm: React.FC<WorkshopFormProps> = ({
  open,
  onClose,
  onSave,
  workshop
}) => {
  const [name, setName] = useState(workshop?.name || '');
  const [location, setLocation] = useState(workshop?.location || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !location.trim()) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    
    onSave({
      name,
      location,
      status: workshop?.status || 'pending'
    });
    
    // Reset form
    setName('');
    setLocation('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {workshop ? 'Editar Taller' : 'Registrar Nuevo Taller'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Ubicación
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WorkshopForm;
