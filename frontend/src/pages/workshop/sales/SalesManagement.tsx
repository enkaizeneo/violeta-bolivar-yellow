
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
  ShoppingCart, 
  Printer, 
  FileText, 
  Plus, 
  Calendar, 
  DollarSign 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoiceForm from "@/components/workshop/InvoiceForm";

// Datos de ejemplo
const MOCK_SALES = [
  { 
    id: "FAC-001", 
    client: "Juan Pérez", 
    date: "10/04/2025", 
    total: 120.00, 
    items: [
      { name: "Batería laptop HP", quantity: 1, price: 80.00 },
      { name: "Mano de obra", quantity: 1, price: 40.00 }
    ],
    status: "Pagada"
  },
  { 
    id: "FAC-002", 
    client: "María López", 
    date: "09/04/2025", 
    total: 250.00,
    items: [
      { name: "Pantalla iPhone 13", quantity: 1, price: 180.00 },
      { name: "Servicio de instalación", quantity: 1, price: 70.00 }
    ],
    status: "Pendiente"
  },
  { 
    id: "FAC-003", 
    client: "Pedro Gomez", 
    date: "05/04/2025", 
    total: 35.00,
    items: [
      { name: "Cable HDMI", quantity: 1, price: 15.00 },
      { name: "Limpieza de componentes", quantity: 1, price: 20.00 }
    ],
    status: "Pagada"
  }
];

const SalesManagement = () => {
  const [sales, setSales] = useState(MOCK_SALES);
  const [isNewInvoiceDialogOpen, setIsNewInvoiceDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isViewInvoiceDialogOpen, setIsViewInvoiceDialogOpen] = useState(false);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("all");
  const [workshopInfo, setWorkshopInfo] = useState<any>(null);

  // Obtener la información del taller del localStorage
  React.useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      const user = JSON.parse(userString);
      setWorkshopInfo(user);
    }
  }, []);

  const handleCreateInvoice = (newInvoice: any) => {
    // En una aplicación real, esto enviaría la factura al servidor
    const invoiceWithId = {
      ...newInvoice,
      id: `FAC-${String(sales.length + 1).padStart(3, '0')}`,
      date: new Date().toLocaleDateString(),
      status: "Pendiente"
    };
    
    setSales([invoiceWithId, ...sales]);
    setIsNewInvoiceDialogOpen(false);
  };

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsViewInvoiceDialogOpen(true);
  };

  const handlePrint = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsPrintDialogOpen(true);
  };

  const handlePrintAction = () => {
    // En una implementación real, esto generaría un PDF
    // Por ahora, simularemos la impresión usando window.print()
    window.print();
    setIsPrintDialogOpen(false);
  };

  const handleStatusChange = (invoiceId: string, newStatus: string) => {
    const updatedSales = sales.map(invoice => 
      invoice.id === invoiceId ? { ...invoice, status: newStatus } : invoice
    );
    setSales(updatedSales);
  };

  // Filtrar ventas según la pestaña seleccionada
  const filteredSales = currentTab === "all" 
    ? sales 
    : currentTab === "pending" 
      ? sales.filter(sale => sale.status === "Pendiente")
      : sales.filter(sale => sale.status === "Pagada");

  // Calcular totales
  const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0);
  const pendingTotal = sales
    .filter(sale => sale.status === "Pendiente")
    .reduce((acc, sale) => acc + sale.total, 0);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Ventas</h1>
        <Button onClick={() => setIsNewInvoiceDialogOpen(true)} className="bg-purple hover:bg-purple-light">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Nueva Factura
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-medium">Total Ventas</CardTitle>
              <CardDescription>Ingresos totales</CardDescription>
            </div>
            <DollarSign className="h-5 w-5 text-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Bs. {(totalSales * 36.2).toFixed(2)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-medium">Facturas Emitidas</CardTitle>
              <CardDescription>Número total de facturas</CardDescription>
            </div>
            <FileText className="h-5 w-5 text-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sales.length}</div>
            <p className="text-xs text-muted-foreground">
              {sales.filter(sale => sale.status === "Pendiente").length} pendientes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-medium">Por Cobrar</CardTitle>
              <CardDescription>Total pendiente por cobrar</CardDescription>
            </div>
            <Calendar className="h-5 w-5 text-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingTotal.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Bs. {(pendingTotal * 36.2).toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Facturas</CardTitle>
          <CardDescription>
            Listado de todas las facturas emitidas
          </CardDescription>
          <Tabs defaultValue="all" onValueChange={setCurrentTab}>
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="pending">Pendientes</TabsTrigger>
              <TabsTrigger value="paid">Pagadas</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>${invoice.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        invoice.status === "Pagada" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewInvoice(invoice)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePrint(invoice)}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                      {invoice.status === "Pendiente" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-green-600"
                          onClick={() => handleStatusChange(invoice.id, "Pagada")}
                        >
                          <DollarSign className="h-4 w-4" />
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

      {/* Diálogo para nueva factura */}
      <Dialog open={isNewInvoiceDialogOpen} onOpenChange={setIsNewInvoiceDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Crear Nueva Factura</DialogTitle>
            <DialogDescription>
              Complete los datos para generar una nueva factura
            </DialogDescription>
          </DialogHeader>
          <InvoiceForm onSubmit={handleCreateInvoice} onCancel={() => setIsNewInvoiceDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Diálogo para ver detalles de la factura */}
      <Dialog open={isViewInvoiceDialogOpen} onOpenChange={setIsViewInvoiceDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles de la Factura #{selectedInvoice?.id}</DialogTitle>
            <DialogDescription>
              Información detallada de la factura
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Cliente:</Label>
                <div className="col-span-3">{selectedInvoice.client}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Fecha:</Label>
                <div className="col-span-3">{selectedInvoice.date}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Estado:</Label>
                <div className="col-span-3">{selectedInvoice.status}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Productos:</Label>
                <div className="col-span-3">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Total:</Label>
                <div className="col-span-3 font-bold">
                  ${selectedInvoice.total.toFixed(2)}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsViewInvoiceDialogOpen(false)}
            >
              Cerrar
            </Button>
            <Button 
              onClick={() => {
                setIsViewInvoiceDialogOpen(false);
                handlePrint(selectedInvoice);
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
            <DialogTitle>Imprimir Factura</DialogTitle>
            <DialogDescription>
              Vista previa para impresión o guardado como PDF
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && workshopInfo && (
            <div className="print-container p-4 border rounded-md">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold">{workshopInfo.name}</h2>
                <p className="text-sm text-gray-600">RIF: {workshopInfo.rif || 'J-12345678-9'}</p>
                <p className="text-sm text-gray-600">Dirección: {workshopInfo.address || 'Av. Principal, Ciudad'}</p>
                <p className="text-sm text-gray-600">Teléfono: {workshopInfo.phone || '+58 123 456 7890'}</p>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">FACTURA</h3>
                <h4 className="text-md font-medium">N° {selectedInvoice.id}</h4>
                <p className="text-sm">Fecha: {selectedInvoice.date}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">DATOS DEL CLIENTE</h4>
                <p>Nombre: {selectedInvoice.client}</p>
                <p>Cédula/RIF: V-12345678</p>
                <p>Dirección: Caracas, Venezuela</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-2">PRODUCTOS Y SERVICIOS</h4>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Descripción</th>
                      <th className="text-center p-2">Cant.</th>
                      <th className="text-right p-2">Precio</th>
                      <th className="text-right p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item: any, index: number) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{item.name}</td>
                        <td className="text-center p-2">{item.quantity}</td>
                        <td className="text-right p-2">${item.price.toFixed(2)}</td>
                        <td className="text-right p-2">${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="text-right p-2 font-semibold">Subtotal:</td>
                      <td className="text-right p-2">${selectedInvoice.total.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-right p-2 font-semibold">IVA (16%):</td>
                      <td className="text-right p-2">${(selectedInvoice.total * 0.16).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-right p-2 font-semibold">Total:</td>
                      <td className="text-right p-2 font-bold">${(selectedInvoice.total * 1.16).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-right p-2 font-semibold">Total Bs.:</td>
                      <td className="text-right p-2 font-bold">Bs. {(selectedInvoice.total * 1.16 * 36.2).toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="mb-6 border-t pt-4">
                <h4 className="font-semibold mb-2">FORMA DE PAGO</h4>
                <p>- Transferencia bancaria</p>
                <p>- Pago móvil</p>
                <p>- Efectivo (Bs. o USD)</p>
              </div>
              
              <div className="flex justify-between mt-10 pt-4 border-t">
                <div className="w-1/2 border-r pr-4">
                  <p className="text-center mb-10">_____________________</p>
                  <p className="text-center">Firma Autorizada</p>
                </div>
                <div className="w-1/2 pl-4">
                  <p className="text-center mb-10">_____________________</p>
                  <p className="text-center">Recibido por</p>
                </div>
              </div>
              
              <div className="text-xs text-center mt-8 text-gray-500">
                <p>Esta factura es un documento legal y debe ser conservada.</p>
                <p>Gracias por su confianza.</p>
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

export default SalesManagement;
