
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Wrench, 
  Plus, 
  FileText, 
  Search,
  Phone, 
  Mail,
  User,
  Star,
  Clock
} from "lucide-react";
import TechnicianForm from "@/components/workshop/TechnicianForm";

// Datos de ejemplo
const MOCK_TECHNICIANS = [
  { 
    id: 1, 
    name: "Carlos Rodriguez", 
    ci: "V-18765432",
    specialties: ["Laptops", "Computadoras de Escritorio"],
    phone: "+58 412 987 6543",
    email: "carlos.rodriguez@gmail.com",
    status: "Activo",
    orders: 12,
    rating: 4.8
  },
  { 
    id: 2, 
    name: "Ana Martinez", 
    ci: "V-20345678",
    specialties: ["Smartphones", "Tablets"],
    phone: "+58 414 123 4567",
    email: "ana.martinez@hotmail.com",
    status: "Activo",
    orders: 8,
    rating: 4.5
  },
  { 
    id: 3, 
    name: "José Sánchez", 
    ci: "V-19876543",
    specialties: ["Impresoras", "Escáneres"],
    phone: "+58 416 543 2109",
    email: "jose.sanchez@gmail.com",
    status: "Inactivo",
    orders: 5,
    rating: 4.2
  },
  { 
    id: 4, 
    name: "Maria González", 
    ci: "V-21654321",
    specialties: ["Computadoras de Escritorio", "Redes"],
    phone: "+58 424 765 4321",
    email: "maria.gonzalez@outlook.com",
    status: "Activo",
    orders: 10,
    rating: 4.7
  }
];

const TechniciansManagement = () => {
  const [technicians, setTechnicians] = useState(MOCK_TECHNICIANS);
  const [isNewTechnicianDialogOpen, setIsNewTechnicianDialogOpen] = useState(false);
  const [isEditTechnicianDialogOpen, setIsEditTechnicianDialogOpen] = useState(false);
  const [isViewTechnicianDialogOpen, setIsViewTechnicianDialogOpen] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateTechnician = (newTechnician: any) => {
    const technicianWithId = {
      ...newTechnician,
      id: technicians.length + 1,
      orders: 0,
      rating: 0
    };
    
    setTechnicians([...technicians, technicianWithId]);
    setIsNewTechnicianDialogOpen(false);
  };

  const handleUpdateTechnician = (updatedTechnician: any) => {
    const updatedTechnicians = technicians.map(technician => 
      technician.id === updatedTechnician.id ? updatedTechnician : technician
    );
    
    setTechnicians(updatedTechnicians);
    setIsEditTechnicianDialogOpen(false);
  };

  const handleViewTechnician = (technician: any) => {
    setSelectedTechnician(technician);
    setIsViewTechnicianDialogOpen(true);
  };

  const handleEditTechnician = (technician: any) => {
    setSelectedTechnician(technician);
    setIsEditTechnicianDialogOpen(true);
  };

  const handleToggleStatus = (technicianId: number) => {
    const updatedTechnicians = technicians.map(technician => 
      technician.id === technicianId 
        ? { ...technician, status: technician.status === "Activo" ? "Inactivo" : "Activo" } 
        : technician
    );
    
    setTechnicians(updatedTechnicians);
  };

  // Filtrar técnicos según la búsqueda
  const filteredTechnicians = technicians.filter(technician => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      technician.name.toLowerCase().includes(query) || 
      technician.ci.toLowerCase().includes(query) ||
      technician.specialties.some(specialty => specialty.toLowerCase().includes(query))
    );
  });

  // Estadísticas
  const totalTechnicians = technicians.length;
  const activeTechnicians = technicians.filter(technician => technician.status === "Activo").length;
  const totalOrders = technicians.reduce((total, technician) => total + technician.orders, 0);
  const averageRating = technicians.length 
    ? technicians.reduce((total, technician) => total + technician.rating, 0) / technicians.length 
    : 0;

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Técnicos</h1>
        <Button onClick={() => setIsNewTechnicianDialogOpen(true)} className="bg-purple hover:bg-purple-light">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Técnico
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-medium">Total Técnicos</CardTitle>
              <CardDescription>Técnicos registrados</CardDescription>
            </div>
            <Wrench className="h-5 w-5 text-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTechnicians}</div>
            <p className="text-xs text-muted-foreground">
              {activeTechnicians} activos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-medium">Órdenes Atendidas</CardTitle>
              <CardDescription>Total órdenes procesadas</CardDescription>
            </div>
            <FileText className="h-5 w-5 text-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {totalOrders > 0 ? `Promedio de ${(totalOrders / activeTechnicians).toFixed(1)} por técnico` : 'Sin órdenes registradas'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-medium">Calificación Promedio</CardTitle>
              <CardDescription>Evaluación de técnicos</CardDescription>
            </div>
            <Star className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 ${
                    star <= Math.round(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Buscar Técnicos</CardTitle>
            <CardDescription>Buscar por nombre, cédula o especialidad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Técnicos</CardTitle>
          <CardDescription>
            Listado de todos los técnicos registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Cédula</TableHead>
                <TableHead>Especialidades</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Órdenes</TableHead>
                <TableHead>Calificación</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTechnicians.map((technician) => (
                <TableRow key={technician.id}>
                  <TableCell>{technician.name}</TableCell>
                  <TableCell>{technician.ci}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {technician.specialties.map((specialty, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{technician.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        technician.status === "Activo" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {technician.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{technician.orders}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {technician.rating > 0 ? (
                        <>
                          <span className="mr-1">{technician.rating.toFixed(1)}</span>
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        </>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewTechnician(technician)}
                      >
                        <User className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditTechnician(technician)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={technician.status === "Activo" ? "text-red-600" : "text-green-600"}
                        onClick={() => handleToggleStatus(technician.id)}
                      >
                        {technician.status === "Activo" ? "Desactivar" : "Activar"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Diálogo para nuevo técnico */}
      <Dialog open={isNewTechnicianDialogOpen} onOpenChange={setIsNewTechnicianDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Técnico</DialogTitle>
            <DialogDescription>
              Complete la información del nuevo técnico
            </DialogDescription>
          </DialogHeader>
          <TechnicianForm onSubmit={handleCreateTechnician} onCancel={() => setIsNewTechnicianDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar técnico */}
      <Dialog open={isEditTechnicianDialogOpen} onOpenChange={setIsEditTechnicianDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Técnico</DialogTitle>
            <DialogDescription>
              Actualice la información del técnico
            </DialogDescription>
          </DialogHeader>
          {selectedTechnician && (
            <TechnicianForm 
              onSubmit={handleUpdateTechnician} 
              onCancel={() => setIsEditTechnicianDialogOpen(false)} 
              initialData={selectedTechnician}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo para ver detalles del técnico */}
      <Dialog open={isViewTechnicianDialogOpen} onOpenChange={setIsViewTechnicianDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles del Técnico</DialogTitle>
            <DialogDescription>
              Información detallada del técnico
            </DialogDescription>
          </DialogHeader>
          {selectedTechnician && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{selectedTechnician.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedTechnician.ci}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedTechnician.status === "Activo" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {selectedTechnician.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-start gap-2">
                  <Wrench className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Especialidades</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedTechnician.specialties.map((specialty: string, index: number) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-sm text-muted-foreground">{selectedTechnician.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{selectedTechnician.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Horario de Trabajo</p>
                    <p className="text-sm text-muted-foreground">Lunes a Viernes, 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Órdenes Atendidas</p>
                    <p className="text-sm text-muted-foreground">{selectedTechnician.orders} órdenes completadas</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Star className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Calificación</p>
                    <div className="flex items-center mt-1">
                      <span className="text-sm font-medium mr-1">{selectedTechnician.rating.toFixed(1)}</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${
                            star <= Math.round(selectedTechnician.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsViewTechnicianDialogOpen(false)}
            >
              Cerrar
            </Button>
            <Button 
              onClick={() => {
                setIsViewTechnicianDialogOpen(false);
                handleEditTechnician(selectedTechnician);
              }}
            >
              Editar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TechniciansManagement;
