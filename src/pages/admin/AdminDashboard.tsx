
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import WorkshopForm, { Workshop } from "@/components/admin/WorkshopForm";
import { fetchWorkshops, createWorkshop, updateWorkshop, deleteWorkshop } from "@/services/workshopService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

    const statusText = 
      newStatus === "active" ? "activado" : 
      newStatus === "pending" ? "puesto en pendiente" : "desactivado";
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
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple">
            <span className="text-yellow">Neo</span>Sis
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Admin: {currentUser.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-6">Panel Administrativo</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Talleres</CardTitle>
              <CardDescription>Total registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{workshops.length}</div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                {workshops.filter(w => w.status === "active").length} activos
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Solicitudes</CardTitle>
              <CardDescription>Pendientes de aprobación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {workshops.filter(w => w.status === "pending").length}
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                Actualizado hoy
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Estadísticas</CardTitle>
              <CardDescription>Rendimiento del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">98%</div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                Tiempo de actividad
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Talleres Registrados</h3>
            <Button className="bg-purple hover:bg-purple-light" onClick={handleAddWorkshop}>
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
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewWorkshop(workshop.id)}
                            >
                              Ver
                            </Button>
                            
                            {workshop.status === "pending" ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-green-600"
                                onClick={() => handleChangeStatus(workshop, "active")}
                              >
                                Aprobar
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditWorkshop(workshop)}
                              >
                                Editar
                              </Button>
                            )}
                            
                            {workshop.status === "active" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-amber-600"
                                onClick={() => handleChangeStatus(workshop, "inactive")}
                              >
                                Desactivar
                              </Button>
                            )}
                            
                            {workshop.status === "inactive" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-green-600"
                                onClick={() => handleChangeStatus(workshop, "active")}
                              >
                                Reactivar
                              </Button>
                            )}
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600"
                              onClick={() => setDeleteConfirmId(workshop.id)}
                            >
                              Eliminar
                            </Button>
                            
                            {deleteConfirmId === workshop.id && (
                              <div className="flex space-x-2">
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleDeleteWorkshop(workshop.id)}
                                >
                                  Confirmar
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setDeleteConfirmId(null)}
                                >
                                  Cancelar
                                </Button>
                              </div>
                            )}
                          </div>
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
