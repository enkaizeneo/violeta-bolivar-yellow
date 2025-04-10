
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
  Truck, 
  Plus, 
  Package, 
  Search,
  Phone, 
  Mail,
  MapPin,
  User,
  FileText
} from "lucide-react";
import SupplierForm from "@/components/workshop/SupplierForm";

// Datos de ejemplo
const MOCK_SUPPLIERS = [
  { 
    id: 1, 
    name: "TecnoPartes C.A.", 
    rif: "J-29876543-2",
    contact: "Luis Hernández",
    phone: "+58 412 555 1234",
    email: "ventas@tecnopartes.com.ve",
    address: "Av. Libertador, Caracas",
    notes: "Proveedor principal de componentes electrónicos",
    status: "Activo",
    products: 15
  },
  { 
    id: 2, 
    name: "CompuMax S.A.", 
    rif: "J-30987654-9",
    contact: "Ana Martínez",
    phone: "+58 414 333 5678",
    email: "pedidos@compumax.com.ve",
    address: "C.C. Sambil, Chacao",
    notes: "Proveedor de periféricos y accesorios",
    status: "Activo",
    products: 22
  },
  { 
    id: 3, 
    name: "Apple Parts Inc.", 
    rif: "J-00123456-7",
    contact: "John Doe",
    phone: "+1 305 123 4567",
    email: "sales@appleparts.com",
    address: "Miami, Florida, USA",
    notes: "Distribuidor oficial de repuestos Apple",
    status: "Inactivo",
    products: 8
  },
  { 
    id: 4, 
    name: "Importadora Digital", 
    rif: "J-31234567-0",
    contact: "Carlos Rojas",
    phone: "+58 416 987 6543",
    email: "info@importadoradigital.com",
    address: "Av. Las Mercedes, Caracas",
    notes: "Proveedor de componentes importados",
    status: "Activo",
    products: 13
  }
];

const SuppliersManagement = () => {
  const [suppliers, setSuppliers] = useState(MOCK_SUPPLIERS);
  const [isNewSupplierDialogOpen, setIsNewSupplierDialogOpen] = useState(false);
  const [isEditSupplierDialogOpen, setIsEditSupplierDialogOpen] = useState(false);
  const [isViewSupplierDialogOpen, setIsViewSupplierDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateSupplier = (newSupplier: any) => {
    const supplierWithId = {
      ...newSupplier,
      id: suppliers.length + 1,
      products: 0
    };
    
    setSuppliers([...suppliers, supplierWithId]);
    setIsNewSupplierDialogOpen(false);
  };

  const handleUpdateSupplier = (updatedSupplier: any) => {
    const updatedSuppliers = suppliers.map(supplier => 
      supplier.id === updatedSupplier.id ? updatedSupplier : supplier
    );
    
    setSuppliers(updatedSuppliers);
    setIsEditSupplierDialogOpen(false);
  };

  const handleViewSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setIsViewSupplierDialogOpen(true);
  };

  const handleEditSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setIsEditSupplierDialogOpen(true);
  };

  const handleToggleStatus = (supplierId: number) => {
    const updatedSuppliers = suppliers.map(supplier => 
      supplier.id === supplierId 
        ? { ...supplier, status: supplier.status === "Activo" ? "Inactivo" : "Activo" } 
        : supplier
    );
    
    setSuppliers(updatedSuppliers);
  };

  // Filtrar proveedores según la búsqueda
  const filteredSuppliers = suppliers.filter(supplier => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      supplier.name.toLowerCase().includes(query) || 
      supplier.contact.toLowerCase().includes(query) ||
      supplier.rif.toLowerCase().includes(query)
    );
  });

  // Estadísticas
  const totalSuppliers = suppliers.length;
  const activeSuppliers = suppliers.filter(supplier => supplier.status === "Activo").length;
  const inactiveSuppliers = suppliers.filter(supplier => supplier.status === "Inactivo").length;

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Proveedores</h1>
        <Button onClick={() => setIsNewSupplierDialogOpen(true)} className="bg-purple hover:bg-purple-light">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Proveedor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-medium">Total Proveedores</CardTitle>
              <CardDescription>Proveedores registrados</CardDescription>
            </div>
            <Truck className="h-5 w-5 text-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSuppliers}</div>
            <p className="text-xs text-muted-foreground">
              {activeSuppliers} activos, {inactiveSuppliers} inactivos
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-medium">Productos Suministrados</CardTitle>
              <CardDescription>Total de productos de proveedores</CardDescription>
            </div>
            <Package className="h-5 w-5 text-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {suppliers.reduce((total, supplier) => total + supplier.products, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              De todos los proveedores
            </p>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Buscar Proveedores</CardTitle>
            <CardDescription>Buscar por nombre, contacto o RIF</CardDescription>
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
          <CardTitle>Proveedores</CardTitle>
          <CardDescription>
            Listado de todos los proveedores registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>RIF</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.rif}</TableCell>
                  <TableCell>{supplier.contact}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        supplier.status === "Activo" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {supplier.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{supplier.products}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewSupplier(supplier)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditSupplier(supplier)}
                      >
                        Editar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={supplier.status === "Activo" ? "text-red-600" : "text-green-600"}
                        onClick={() => handleToggleStatus(supplier.id)}
                      >
                        {supplier.status === "Activo" ? "Desactivar" : "Activar"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Diálogo para nuevo proveedor */}
      <Dialog open={isNewSupplierDialogOpen} onOpenChange={setIsNewSupplierDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Proveedor</DialogTitle>
            <DialogDescription>
              Complete la información del nuevo proveedor
            </DialogDescription>
          </DialogHeader>
          <SupplierForm onSubmit={handleCreateSupplier} onCancel={() => setIsNewSupplierDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar proveedor */}
      <Dialog open={isEditSupplierDialogOpen} onOpenChange={setIsEditSupplierDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Proveedor</DialogTitle>
            <DialogDescription>
              Actualice la información del proveedor
            </DialogDescription>
          </DialogHeader>
          {selectedSupplier && (
            <SupplierForm 
              onSubmit={handleUpdateSupplier} 
              onCancel={() => setIsEditSupplierDialogOpen(false)} 
              initialData={selectedSupplier}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo para ver detalles del proveedor */}
      <Dialog open={isViewSupplierDialogOpen} onOpenChange={setIsViewSupplierDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalles del Proveedor</DialogTitle>
            <DialogDescription>
              Información detallada del proveedor
            </DialogDescription>
          </DialogHeader>
          {selectedSupplier && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{selectedSupplier.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedSupplier.rif}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedSupplier.status === "Activo" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {selectedSupplier.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Contacto</p>
                    <p className="text-sm text-muted-foreground">{selectedSupplier.contact}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Teléfono</p>
                    <p className="text-sm text-muted-foreground">{selectedSupplier.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{selectedSupplier.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-sm text-muted-foreground">{selectedSupplier.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 md:col-span-2">
                  <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Notas</p>
                    <p className="text-sm text-muted-foreground">{selectedSupplier.notes || 'Sin notas adicionales'}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Package className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Productos Suministrados</p>
                  <p className="text-sm text-muted-foreground">{selectedSupplier.products} productos en catálogo</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsViewSupplierDialogOpen(false)}
            >
              Cerrar
            </Button>
            <Button 
              onClick={() => {
                setIsViewSupplierDialogOpen(false);
                handleEditSupplier(selectedSupplier);
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

export default SuppliersManagement;
