
import React from "react";
import { Workshop } from "@/components/admin/WorkshopForm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import WorkshopActions from "./WorkshopActions";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface WorkshopListProps {
  workshops: Workshop[];
  isLoading: boolean;
  deleteConfirmId: number | null;
  onAddWorkshop: () => void;
  onEditWorkshop: (workshop: Workshop) => void;
  onDeleteWorkshop: (id: number) => void;
  onChangeStatus: (workshop: Workshop, newStatus: "active" | "pending" | "inactive") => void;
  onViewWorkshop: (id: number) => void;
  onSetDeleteConfirmId: (id: number | null) => void;
}

const WorkshopList: React.FC<WorkshopListProps> = ({
  workshops,
  isLoading,
  deleteConfirmId,
  onAddWorkshop,
  onEditWorkshop,
  onDeleteWorkshop,
  onChangeStatus,
  onViewWorkshop,
  onSetDeleteConfirmId
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Talleres Registrados</h3>
        <Button className="bg-purple hover:bg-purple-light" onClick={onAddWorkshop}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Taller
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-6">Cargando talleres...</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha de Registro</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workshops.length > 0 ? (
                workshops.map((workshop) => (
                  <TableRow key={workshop.id}>
                    <TableCell>{workshop.id}</TableCell>
                    <TableCell className="font-medium">{workshop.name}</TableCell>
                    <TableCell>{workshop.location}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        workshop.status === "active" 
                          ? "bg-green-100 text-green-800" 
                          : workshop.status === "pending" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-red-100 text-red-800"
                      }`}>
                        {workshop.status === "active" 
                          ? "Activo" 
                          : workshop.status === "pending" 
                            ? "Pendiente" 
                            : "Inactivo"}
                      </span>
                    </TableCell>
                    <TableCell>{workshop.registrationDate}</TableCell>
                    <TableCell>
                      <WorkshopActions
                        workshop={workshop}
                        deleteConfirmId={deleteConfirmId}
                        onEdit={onEditWorkshop}
                        onDelete={onDeleteWorkshop}
                        onChangeStatus={onChangeStatus}
                        onViewWorkshop={onViewWorkshop}
                        onSetDeleteConfirmId={onSetDeleteConfirmId}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No hay talleres registrados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default WorkshopList;
