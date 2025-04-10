
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
import { FilePlus, Printer, FileText, Check, X } from "lucide-react";
import OrderForm from "@/components/workshop/OrderForm";

// Datos de ejemplo
const MOCK_ORDERS = [
  { 
    id: "ORD-001", 
    client: "Juan Pérez", 
    device: "Laptop HP", 
    issue: "No enciende", 
    status: "Pendiente", 
    date: "10/04/2025",
    technician: "Carlos Rodriguez"
  },
  { 
    id: "ORD-002", 
    client: "María López", 
    device: "iPhone 13", 
    issue: "Pantalla rota", 
    status: "En progreso", 
    date: "09/04/2025",
    technician: "Ana Martinez"
  },
  { 
    id: "ORD-003", 
    client: "Pedro Gomez", 
    device: "Impresora Canon", 
    issue: "Error de conexión", 
    status: "Completado", 
    date: "05/04/2025",
    technician: "José Sánchez"
  }
];

const OrdersManagement = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isViewOrderDialogOpen, setIsViewOrderDialogOpen] = useState(false);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [workshopInfo, setWorkshopInfo] = useState<any>(null);

  // Obtener la información del taller del localStorage
  React.useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      const user = JSON.parse(userString);
      setWorkshopInfo(user);
    }
  }, []);

  const handleCreateOrder = (newOrder: any) => {
    // En una aplicación real, esto enviaría la orden al servidor
    const orderWithId = {
      ...newOrder,
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toLocaleDateString(),
      status: "Pendiente"
    };
    
    setOrders([orderWithId, ...orders]);
    setIsNewOrderDialogOpen(false);
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsViewOrderDialogOpen(true);
  };

  const handlePrint = (order: any) => {
    setSelectedOrder(order);
    setIsPrintDialogOpen(true);
  };

  const handlePrintAction = () => {
    // En una implementación real, esto generaría un PDF
    // Por ahora, simularemos la impresión usando window.print()
    window.print();
    setIsPrintDialogOpen(false);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Órdenes de Reparación</h1>
        <Button onClick={() => setIsNewOrderDialogOpen(true)} className="bg-purple hover:bg-purple-light">
          <FilePlus className="mr-2 h-4 w-4" />
          Nueva Orden
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Órdenes de Reparación</CardTitle>
          <CardDescription>
            Listado de todas las órdenes de reparación del taller
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Dispositivo</TableHead>
                <TableHead>Problema</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Técnico</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.device}</TableCell>
                  <TableCell>{order.issue}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "Completado" 
                          ? "bg-green-100 text-green-800" 
                          : order.status === "En progreso" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.technician}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewOrder(order)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePrint(order)}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                      {order.status !== "Completado" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-green-600"
                          onClick={() => handleStatusChange(order.id, "Completado")}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      {order.status === "Pendiente" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-blue-600"
                          onClick={() => handleStatusChange(order.id, "En progreso")}
                        >
                          <span className="text-xs">Iniciar</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Diálogo para nueva orden */}
      <Dialog open={isNewOrderDialogOpen} onOpenChange={setIsNewOrderDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Crear Nueva Orden de Reparación</DialogTitle>
            <DialogDescription>
              Complete los datos para generar una nueva orden de reparación
            </DialogDescription>
          </DialogHeader>
          <OrderForm onSubmit={handleCreateOrder} onCancel={() => setIsNewOrderDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Diálogo para ver detalles de la orden */}
      <Dialog open={isViewOrderDialogOpen} onOpenChange={setIsViewOrderDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles de la Orden #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Información detallada de la orden de reparación
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Cliente:</Label>
                <div className="col-span-3">{selectedOrder.client}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Dispositivo:</Label>
                <div className="col-span-3">{selectedOrder.device}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Problema:</Label>
                <div className="col-span-3">{selectedOrder.issue}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Estado:</Label>
                <div className="col-span-3">{selectedOrder.status}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Fecha:</Label>
                <div className="col-span-3">{selectedOrder.date}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Técnico:</Label>
                <div className="col-span-3">{selectedOrder.technician}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsViewOrderDialogOpen(false)}
            >
              Cerrar
            </Button>
            <Button 
              onClick={() => {
                setIsViewOrderDialogOpen(false);
                handlePrint(selectedOrder);
              }}
            >
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para imprimir/guardar PDF */}
      <Dialog open={isPrintDialogOpen} onOpenChange={setIsPrintDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Imprimir Orden de Reparación</DialogTitle>
            <DialogDescription>
              Vista previa para impresión o guardado como PDF
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && workshopInfo && (
            <div className="print-container p-4 border rounded-md">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold">{workshopInfo.name}</h2>
                <p className="text-sm text-gray-600">RIF: {workshopInfo.rif || 'J-12345678-9'}</p>
                <p className="text-sm text-gray-600">Dirección: {workshopInfo.address || 'Av. Principal, Ciudad'}</p>
                <p className="text-sm text-gray-600">Teléfono: {workshopInfo.phone || '+58 123 456 7890'}</p>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">ORDEN DE REPARACIÓN</h3>
                <h4 className="text-md font-medium">N° {selectedOrder.id}</h4>
                <p className="text-sm">Fecha: {selectedOrder.date}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">INFORMACIÓN DEL CLIENTE</h4>
                <p>Nombre: {selectedOrder.client}</p>
                <p>Cédula/RIF: V-12345678</p>
                <p>Teléfono: (0414) 123-4567</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">EQUIPO</h4>
                <p>Dispositivo: {selectedOrder.device}</p>
                <p>Modelo: {selectedOrder.model || 'N/A'}</p>
                <p>Serial: {selectedOrder.serial || 'N/A'}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">FALLA REPORTADA</h4>
                <p>{selectedOrder.issue}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">DIAGNÓSTICO TÉCNICO</h4>
                <p>{selectedOrder.diagnosis || 'Pendiente'}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">TÉCNICO ASIGNADO</h4>
                <p>{selectedOrder.technician}</p>
              </div>
              
              <div className="flex justify-between mt-10 pt-4 border-t">
                <div className="w-1/2 border-r pr-4">
                  <p className="text-center mb-10">_____________________</p>
                  <p className="text-center">Firma del Cliente</p>
                </div>
                <div className="w-1/2 pl-4">
                  <p className="text-center mb-10">_____________________</p>
                  <p className="text-center">Firma del Técnico</p>
                </div>
              </div>
              
              <div className="text-xs text-center mt-8 text-gray-500">
                <p>Al firmar esta orden, el cliente acepta las condiciones del servicio.</p>
                <p>Garantía: 30 días en mano de obra (no cubre daños por mal uso).</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPrintDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handlePrintAction}>
              <Printer className="mr-2 h-4 w-4" />
              Imprimir/Guardar PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersManagement;
