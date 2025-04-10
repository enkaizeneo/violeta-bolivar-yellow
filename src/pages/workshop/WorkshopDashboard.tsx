import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  FileText, 
  Package, 
  BarChart, 
  User, 
  Wrench, 
  ShoppingCart,
  Truck
} from "lucide-react";

const MOCK_STATS = {
  orders: {
    total: 126,
    pending: 18,
    inProgress: 24,
    completed: 84
  },
  clients: 87,
  technicians: 12,
  suppliers: 8,
  inventory: {
    parts: 342,
    lowStock: 15
  },
  sales: {
    monthly: "$8,500",
    monthlyBs: "Bs. 307,700"
  }
};

const WorkshopDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    
    if (!userString) {
      navigate("/login");
      return;
    }
    
    const user = JSON.parse(userString);
    
    if (user.role !== "workshop_admin") {
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
            <span className="text-sm font-medium">Taller: {currentUser.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-6">Panel de Administración del Taller</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-sm font-medium">Órdenes Totales</CardTitle>
                <CardDescription>Todas las órdenes de reparación</CardDescription>
              </div>
              <FileText className="h-5 w-5 text-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_STATS.orders.total}</div>
              <p className="text-xs text-muted-foreground">
                {MOCK_STATS.orders.pending} pendientes, {MOCK_STATS.orders.inProgress} en progreso
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-sm font-medium">Clientes</CardTitle>
                <CardDescription>Clientes registrados</CardDescription>
              </div>
              <Users className="h-5 w-5 text-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_STATS.clients}</div>
              <p className="text-xs text-muted-foreground">
                12 nuevos este mes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-sm font-medium">Inventario</CardTitle>
                <CardDescription>Repuestos disponibles</CardDescription>
              </div>
              <Package className="h-5 w-5 text-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_STATS.inventory.parts}</div>
              <p className="text-xs text-muted-foreground">
                {MOCK_STATS.inventory.lowStock} con stock bajo
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                <CardDescription>Ventas del mes</CardDescription>
              </div>
              <BarChart className="h-5 w-5 text-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_STATS.sales.monthly}</div>
              <p className="text-xs text-muted-foreground">
                {MOCK_STATS.sales.monthlyBs}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="mb-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-6 h-auto">
            <TabsTrigger value="orders" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              <span>Órdenes</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Clientes</span>
            </TabsTrigger>
            <TabsTrigger value="technicians" className="flex items-center">
              <Wrench className="mr-2 h-4 w-4" />
              <span>Técnicos</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center">
              <Package className="mr-2 h-4 w-4" />
              <span>Inventario</span>
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="flex items-center">
              <Truck className="mr-2 h-4 w-4" />
              <span>Proveedores</span>
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>Ventas</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Órdenes de Reparación</CardTitle>
                <CardDescription>
                  Gestiona todas las órdenes de reparación de dispositivos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-muted-foreground mb-4">
                    Aquí podrás gestionar todas las órdenes de reparación, crear nuevas órdenes,
                    asignar técnicos, actualizar estados y más.
                  </p>
                  <Button className="bg-purple hover:bg-purple-light">
                    Nueva Orden de Reparación
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Clientes</CardTitle>
                <CardDescription>
                  Administra la información de todos los clientes registrados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-muted-foreground mb-4">
                    En esta sección puedes ver y gestionar todos los clientes del taller,
                    su información personal y su historial de reparaciones.
                  </p>
                  <Button className="bg-purple hover:bg-purple-light">
                    Registrar Nuevo Cliente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technicians" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Técnicos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-muted-foreground">
                    Administra tu equipo de técnicos y sus asignaciones.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventario de Repuestos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-muted-foreground">
                    Gestiona tu inventario de repuestos y componentes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Proveedores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-muted-foreground">
                    Administra tus proveedores y órdenes de compra.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Ventas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <p className="text-muted-foreground">
                    Revisa y gestiona las ventas de repuestos y servicios.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkshopDashboard;
