
import React from "react";
import { Button } from "@/components/ui/button";
import { Workshop } from "@/components/admin/WorkshopForm";
import { toast } from "sonner";

interface WorkshopActionsProps {
  workshop: Workshop;
  deleteConfirmId: number | null;
  onEdit: (workshop: Workshop) => void;
  onDelete: (id: number) => void;
  onChangeStatus: (workshop: Workshop, newStatus: "active" | "pending" | "inactive") => void;
  onViewWorkshop: (id: number) => void;
  onSetDeleteConfirmId: (id: number | null) => void;
}

const WorkshopActions: React.FC<WorkshopActionsProps> = ({ 
  workshop, 
  deleteConfirmId, 
  onEdit, 
  onDelete, 
  onChangeStatus, 
  onViewWorkshop, 
  onSetDeleteConfirmId 
}) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onViewWorkshop(workshop.id)}
      >
        Ver
      </Button>
      
      {workshop.status === "pending" ? (
        <Button 
          variant="outline" 
          size="sm"
          className="text-green-600"
          onClick={() => onChangeStatus(workshop, "active")}
        >
          Aprobar
        </Button>
      ) : (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onEdit(workshop)}
        >
          Editar
        </Button>
      )}
      
      {workshop.status === "active" && (
        <Button 
          variant="outline" 
          size="sm"
          className="text-amber-600"
          onClick={() => onChangeStatus(workshop, "inactive")}
        >
          Desactivar
        </Button>
      )}
      
      {workshop.status === "inactive" && (
        <Button 
          variant="outline" 
          size="sm"
          className="text-green-600"
          onClick={() => onChangeStatus(workshop, "active")}
        >
          Reactivar
        </Button>
      )}
      
      <Button 
        variant="outline" 
        size="sm"
        className="text-red-600"
        onClick={() => onSetDeleteConfirmId(workshop.id)}
      >
        Eliminar
      </Button>
      
      {deleteConfirmId === workshop.id && (
        <div className="flex space-x-2">
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onDelete(workshop.id)}
          >
            Confirmar
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onSetDeleteConfirmId(null)}
          >
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkshopActions;
