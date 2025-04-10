
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Wrench, Building, BarChart } from "lucide-react";

// Mock de talleres registrados
const MOCK_WORKSHOPS = [
  { id: 1, name: "Taller Central", location: "Caracas", status: "active", registrationDate: "2023-01-15" },
  { id: 2, name: "Taller Técnico Valencia", location: "Valencia", status: "pending", registrationDate: "2023-02-20" },
  { id: 3, name: "Servicio Express Maracay", location: "Maracay", status: "active", registrationDate: "2023-01-28" },
  { id: 4, name: "Taller Digital Barquisimeto", location: "Barquisimeto", status: "inactive", registrationDate: "2023-03-05" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

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

  if (!currentUser) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple">
            <span className="text-yellow">Orden</span>DeReparación
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
              <div className="text-3xl font-bold">{MOCK_WORKSHOPS.length}</div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                {MOCK_WORKSHOPS.filter(w => w.status === "active").length} activos
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
                {MOCK_WORKSHOPS.filter(w => w.status === "pending").length}
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
            <Button className="bg-purple hover:bg-purple-light">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Taller
            </Button>
          </div>

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
                {MOCK_WORKSHOPS.map((workshop) => (
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
                        <Button variant="outline" size="sm">Ver</Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={workshop.status === "pending" ? "text-green-600" : "text-gray-500"}
                        >
                          {workshop.status === "pending" ? "Aprobar" : "Editar"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
