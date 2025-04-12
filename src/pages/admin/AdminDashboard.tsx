
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import WorkshopForm, { Workshop } from "@/components/admin/WorkshopForm";
import { fetchWorkshops, createWorkshop, updateWorkshop, deleteWorkshop } from "@/services/workshopService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Import refactored components
import AdminHeader from "./components/AdminHeader";
import StatsCards from "./components/StatsCards";
import WorkshopList from "./components/WorkshopList";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [currentWorkshop, setCurrentWorkshop] = useState<Workshop | undefined>(undefined);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Fetch workshops
  const { data: workshops = [], isLoading } = useQuery({
    queryKey: ['workshops'],
    queryFn: fetchWorkshops
  });

  // Mutations for workshops
  const createWorkshopMutation = useMutation({
    mutationFn: createWorkshop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workshops'] });
      toast.success("Taller registrado con éxito");
      setFormOpen(false);
    },
    onError: (error: Error) => {
      toast.error(`Error al registrar taller: ${error.message}`);
    }
  });

  const updateWorkshopMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: Partial<Omit<Workshop, 'id' | 'registrationDate'>> }) => 
      updateWorkshop(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workshops'] });
      toast.success("Taller actualizado con éxito");
      setFormOpen(false);
    },
    onError: (error: Error) => {
      toast.error(`Error al actualizar taller: ${error.message}`);
    }
  });

  const deleteWorkshopMutation = useMutation({
    mutationFn: deleteWorkshop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workshops'] });
      toast.success("Taller eliminado con éxito");
      setDeleteConfirmId(null);
    },
    onError: (error: Error) => {
      toast.error(`Error al eliminar taller: ${error.message}`);
    }
  });

  useEffect(() => {
    // Verificar si el usuario está autenticado y tiene el rol correcto
    const userString = localStorage.getItem("currentUser");
    
    if (!userString) {
      navigate("/login");
      return;
    }
    
    const user = JSON.parse(userString);
    
    if (user.role !== "admin") {
      navigate("/login");
      return;
    }
    
    setCurrentUser(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleAddWorkshop = () => {
    setCurrentWorkshop(undefined);
    setFormOpen(true);
  };

  const handleEditWorkshop = (workshop: Workshop) => {
    setCurrentWorkshop(workshop);
    setFormOpen(true);
  };

  const handleSaveWorkshop = (workshopData: Omit<Workshop, 'id' | 'registrationDate'>) => {
    if (currentWorkshop) {
      // Actualizar taller existente
      updateWorkshopMutation.mutate({ 
        id: currentWorkshop.id, 
        data: workshopData 
      });
    } else {
      // Agregar nuevo taller
      createWorkshopMutation.mutate(workshopData);
    }
  };

  const handleDeleteWorkshop = (id: number) => {
    deleteWorkshopMutation.mutate(id);
  };

  const handleChangeStatus = (workshop: Workshop, newStatus: "active" | "pending" | "inactive") => {
    updateWorkshopMutation.mutate({ 
      id: workshop.id, 
      data: { status: newStatus } 
    });
  };

  const handleViewWorkshop = (id: number) => {
    toast.info(`Visualizando detalles del taller ID: ${id}`);
    // Aquí iría la navegación a la vista detallada del taller
  };

  if (!currentUser) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader 
        userName={currentUser.name} 
        onLogout={handleLogout} 
      />

      <main className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-6">Panel Administrativo</h2>

        <StatsCards workshops={workshops} />

        <WorkshopList 
          workshops={workshops}
          isLoading={isLoading}
          deleteConfirmId={deleteConfirmId}
          onAddWorkshop={handleAddWorkshop}
          onEditWorkshop={handleEditWorkshop}
          onDeleteWorkshop={handleDeleteWorkshop}
          onChangeStatus={handleChangeStatus}
          onViewWorkshop={handleViewWorkshop}
          onSetDeleteConfirmId={setDeleteConfirmId}
        />
      </main>
      
      <WorkshopForm 
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSaveWorkshop}
        workshop={currentWorkshop}
      />
    </div>
  );
};

export default AdminDashboard;
