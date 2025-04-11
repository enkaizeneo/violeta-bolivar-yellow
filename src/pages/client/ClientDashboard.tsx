
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";

// Mock de órdenes de reparación para el cliente
const MOCK_REPAIR_ORDERS = [
  { 
    id: "OR-2023-001", 
    device: "Smartphone Samsung Galaxy S21", 
    issue: "Pantalla rota", 
    status: "completed", 
    entryDate: "2023-04-15", 
    completionDate: "2023-04-17",
    cost: { usd: 45, bs: 1629 }
  },
  { 
    id: "OR-2023-034", 
    device: "Laptop HP Pavilion", 
    issue: "No enciende", 
    status: "in_progress", 
    entryDate: "2023-04-28", 
    completionDate: null,
    estimatedCost: { usd: 80, bs: 2896 }
  },
  { 
    id: "OR-2023-067", 
    device: "Tablet iPad Air", 
    issue: "Batería no carga", 
    status: "pending", 
    entryDate: "2023-05-05", 
    completionDate: null,
    estimatedCost: { usd: 35, bs: 1267 }
  },
];

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    // Verificar si el usuario está autenticado y tiene el rol correcto
    const userString = localStorage.getItem("currentUser");
    
    if (!userString) {
      navigate("/login");
      return;
    }
    
    const user = JSON.parse(userString);
    
    if (user.role !== "client") {
      navigate("/login");
      return;
    }
    
    setCurrentUser(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="flex items-center text-amber-600 bg-amber-100 px-2 py-1 rounded-full text-xs">
            <Clock className="h-3 w-3 mr-1" />
            Pendiente
          </span>
        );
      case "in_progress":
        return (
          <span className="flex items-center text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-xs">
            <Clock className="h-3 w-3 mr-1" />
            En progreso
          </span>
        );
      case "completed":
        return (
          <span className="flex items-center text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completado
          </span>
        );
      case "cancelled":
        return (
          <span className="flex items-center text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelado
          </span>
        );
      default:
        return (
          <span className="flex items-center text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-xs">
            Desconocido
          </span>
        );
    }
  };

  const filteredOrders = MOCK_REPAIR_ORDERS.filter(order => {
    if (activeTab === "active") {
      return order.status === "pending" || order.status === "in_progress";
    } else if (activeTab === "completed") {
      return order.status === "completed";
    } else if (activeTab === "all") {
      return true;
    }
    return false;
  });

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
            <span className="text-sm font-medium">Cliente: {currentUser.name}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-6">Mi Panel de Cliente</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-sm font-medium">Órdenes Activas</CardTitle>
                <CardDescription>Reparaciones en proceso</CardDescription>
              </div>
              <Clock className="h-5 w-5 text-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {MOCK_REPAIR_ORDERS.filter(o => o.status === "pending" || o.status === "in_progress").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-sm font-medium">Reparaciones Completadas</CardTitle>
                <CardDescription>Historial de servicios</CardDescription>
              </div>
              <CheckCircle className="h-5 w-5 text-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {MOCK_REPAIR_ORDERS.filter(o => o.status === "completed").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-sm font-medium">Total de Servicios</CardTitle>
                <CardDescription>Todos los servicios</CardDescription>
              </div>
              <FileText className="h-5 w-5 text-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{MOCK_REPAIR_ORDERS.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Mis Órdenes de Reparación</h3>
            <div className="flex space-x-2">
              <Button 
                variant={activeTab === "active" ? "default" : "outline"} 
                className={activeTab === "active" ? "bg-purple hover:bg-purple-light" : ""}
                onClick={() => setActiveTab("active")}
              >
                Activas
              </Button>
              <Button 
                variant={activeTab === "completed" ? "default" : "outline"} 
                className={activeTab === "completed" ? "bg-purple hover:bg-purple-light" : ""}
                onClick={() => setActiveTab("completed")}
              >
                Completadas
              </Button>
              <Button 
                variant={activeTab === "all" ? "default" : "outline"} 
                className={activeTab === "all" ? "bg-purple hover:bg-purple-light" : ""}
                onClick={() => setActiveTab("all")}
              >
                Todas
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Orden #</TableHead>
                  <TableHead>Dispositivo</TableHead>
                  <TableHead>Problema</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha Ingreso</TableHead>
                  <TableHead>Fecha Entrega</TableHead>
                  <TableHead>Costo</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.device}</TableCell>
                      <TableCell>{order.issue}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{order.entryDate}</TableCell>
                      <TableCell>{order.completionDate || "Pendiente"}</TableCell>
                      <TableCell>
                        {order.status === "completed" 
                          ? `$${order.cost.usd} / Bs. ${order.cost.bs}` 
                          : `$${order.estimatedCost.usd} / Bs. ${order.estimatedCost.bs} (Est.)`}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                      No se encontraron órdenes para mostrar.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
