
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
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
  Truck,
  Printer
} from "lucide-react";

// Importar componentes de los módulos
import OrdersManagement from "./orders/OrdersManagement";
import SalesManagement from "./sales/SalesManagement";
import InventoryManagement from "./inventory/InventoryManagement";
import SuppliersManagement from "./suppliers/SuppliersManagement";
import TechniciansManagement from "./technicians/TechniciansManagement";

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
  const [activeTab, setActiveTab] = useState("dashboard");

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

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersManagement />;
      case "clients":
        return (
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
        );
      case "technicians":
        return <TechniciansManagement />;
      case "inventory":
        return <InventoryManagement />;
      case "suppliers":
        return <SuppliersManagement />;
      case "sales":
        return <SalesManagement />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Órdenes Recientes</CardTitle>
            <CardDescription>
              Últimas órdenes de reparación registradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h4 className="font-medium">ORD-126</h4>
                  <p className="text-sm text-muted-foreground">iPhone 13 - Pantalla rota</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">María López</p>
                  <span className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                    Pendiente
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h4 className="font-medium">ORD-125</h4>
                  <p className="text-sm text-muted-foreground">Laptop HP - No enciende</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Juan Pérez</p>
                  <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    En progreso
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">ORD-124</h4>
                  <p className="text-sm text-muted-foreground">Impresora Canon - Error de conexión</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Pedro Gómez</p>
                  <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Completado
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveTab("orders")}
              >
                Ver todas las órdenes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Accesos directos a funciones comunes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setActiveTab("orders")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Nueva Orden
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setActiveTab("sales")}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Nueva Factura
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setActiveTab("inventory")}
              >
                <Package className="mr-2 h-4 w-4" />
                Actualizar Inventario
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setActiveTab("technicians")}
              >
                <Wrench className="mr-2 h-4 w-4" />
                Gestionar Técnicos
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
              >
                <Printer className="mr-2 h-4 w-4" />
                Imprimir Reportes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

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
        <h2 className="text-3xl font-bold mb-6">
          {activeTab === "dashboard" 
            ? "Panel de Administración del Taller" 
            : activeTab === "orders" 
              ? "Gestión de Órdenes" 
              : activeTab === "clients" 
                ? "Gestión de Clientes" 
                : activeTab === "technicians" 
                  ? "Gestión de Técnicos" 
                  : activeTab === "inventory" 
                    ? "Gestión de Inventario" 
                    : activeTab === "suppliers" 
                      ? "Gestión de Proveedores" 
                      : "Gestión de Ventas"}
        </h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-7 h-auto">
            <TabsTrigger value="dashboard" className="flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
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
          
          <TabsContent value={activeTab} className="mt-6">
            {renderTabContent()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkshopDashboard;
