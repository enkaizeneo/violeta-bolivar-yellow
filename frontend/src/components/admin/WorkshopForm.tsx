
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [status, setStatus] = useState<"active" | "pending" | "inactive">(workshop?.status || 'pending');
  
  // Reset form when workshop prop changes
  useEffect(() => {
    if (workshop) {
      setName(workshop.name);
      setLocation(workshop.location);
      setStatus(workshop.status);
    } else {
      setName('');
      setLocation('');
      setStatus('pending');
    }
  }, [workshop, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !location.trim()) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    
    onSave({
      name,
      location,
      status
    });
    
    // Form reset is now handled by useEffect
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
            
            {workshop && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Estado
                </Label>
                <Select 
                  value={status} 
                  onValueChange={(value: "active" | "pending" | "inactive") => setStatus(value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
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
