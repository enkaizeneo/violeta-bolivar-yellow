
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
  Package, 
  Plus, 
  BarChart4, 
  Search,
  AlertTriangle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import ProductForm from "@/components/workshop/ProductForm";

// Datos de ejemplo
const MOCK_PRODUCTS = [
  { 
    id: 1, 
    name: "Batería laptop HP", 
    category: "Baterías", 
    stock: 5, 
    minStock: 3,
    buyPrice: 50.00,
    sellPrice: 80.00,
    supplier: "TecnoPartes C.A."
  },
  { 
    id: 2, 
    name: "Pantalla iPhone 13", 
    category: "Pantallas", 
    stock: 2, 
    minStock: 3,
    buyPrice: 120.00,
    sellPrice: 180.00,
    supplier: "Apple Parts Inc."
  },
  { 
    id: 3, 
    name: "Teclado mecánico", 
    category: "Periféricos", 
    stock: 8, 
    minStock: 5,
    buyPrice: 30.00,
    sellPrice: 45.00,
    supplier: "CompuMax S.A."
  },
  { 
    id: 4, 
    name: "Mouse inalámbrico", 
    category: "Periféricos", 
    stock: 12, 
    minStock: 5,
    buyPrice: 15.00,
    sellPrice: 25.00,
    supplier: "CompuMax S.A."
  },
  { 
    id: 5, 
    name: "Adaptador HDMI", 
    category: "Cables y adaptadores", 
    stock: 20, 
    minStock: 10,
    buyPrice: 8.00,
    sellPrice: 15.00,
    supplier: "TecnoPartes C.A."
  },
  { 
    id: 6, 
    name: "Memoria RAM DDR4 8GB", 
    category: "Memorias", 
    stock: 0, 
    minStock: 5,
    buyPrice: 40.00,
    sellPrice: 60.00,
    supplier: "CompuMax S.A."
  }
];

const InventoryManagement = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [isNewProductDialogOpen, setIsNewProductDialogOpen] = useState(false);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateProduct = (newProduct: any) => {
    const productWithId = {
      ...newProduct,
      id: products.length + 1
    };
    
    setProducts([...products, productWithId]);
    setIsNewProductDialogOpen(false);
  };

  const handleUpdateProduct = (updatedProduct: any) => {
    const updatedProducts = products.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    );
    
    setProducts(updatedProducts);
    setIsEditProductDialogOpen(false);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsEditProductDialogOpen(true);
  };

  const handleUpdateStock = (productId: number, newStock: number) => {
    const updatedProducts = products.map(product => 
      product.id === productId ? { ...product, stock: newStock } : product
    );
    
    setProducts(updatedProducts);
  };

  // Filtrar productos según la pestaña seleccionada y la búsqueda
  const filteredProducts = products
    .filter(product => {
      if (currentTab === "all") return true;
      if (currentTab === "low") return product.stock <= product.minStock;
      if (currentTab === "out") return product.stock === 0;
      return true;
    })
    .filter(product => {
      if (!searchQuery) return true;
      return product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
             product.category.toLowerCase().includes(searchQuery.toLowerCase());
    });

  // Estadísticas
  const totalProducts = products.length;
  const lowStockProducts = products.filter(product => product.stock <= product.minStock).length;
  const outOfStockProducts = products.filter(product => product.stock === 0).length;
  const inventoryValue = products.reduce((total, product) => total + (product.buyPrice * product.stock), 0);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Inventario</h1>
        <Button onClick={() => setIsNewProductDialogOpen(true)} className="bg-purple hover:bg-purple-light">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
              <CardDescription>Productos en catálogo</CardDescription>
            </div>
            <Package className="h-5 w-5 text-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              {products.reduce((total, product) => total + product.stock, 0)} unidades en total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
              <CardDescription>Productos con stock bajo</CardDescription>
            </div>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockProducts}</div>
            <p className="text-xs text-muted-foreground">
              {outOfStockProducts} agotados
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-sm font-medium">Valor del Inventario</CardTitle>
              <CardDescription>Costo total del inventario</CardDescription>
            </div>
            <BarChart4 className="h-5 w-5 text-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${inventoryValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Bs. {(inventoryValue * 36.2).toFixed(2)}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Buscar Productos</CardTitle>
            <CardDescription>Buscar por nombre o categoría</CardDescription>
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
          <CardTitle>Inventario</CardTitle>
          <CardDescription>
            Listado de todos los productos en inventario
          </CardDescription>
          <Tabs defaultValue="all" onValueChange={setCurrentTab}>
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="low">Stock Bajo</TabsTrigger>
              <TabsTrigger value="out">Agotados</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Precio Compra</TableHead>
                <TableHead>Precio Venta</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`
                        ${product.stock === 0 
                          ? 'text-red-500' 
                          : product.stock <= product.minStock 
                            ? 'text-yellow-500' 
                            : 'text-green-500'
                        } font-medium
                      `}>
                        {product.stock}
                      </span>
                      {product.stock <= product.minStock && (
                        <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-800 border-yellow-200">
                          {product.stock === 0 ? 'Agotado' : 'Stock Bajo'}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>${product.buyPrice.toFixed(2)}</TableCell>
                  <TableCell>${product.sellPrice.toFixed(2)}</TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditProduct(product)}
                      >
                        Editar
                      </Button>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUpdateStock(product.id, Math.max(0, product.stock - 1))}
                        >
                          -
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUpdateStock(product.id, product.stock + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Diálogo para nuevo producto */}
      <Dialog open={isNewProductDialogOpen} onOpenChange={setIsNewProductDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Producto</DialogTitle>
            <DialogDescription>
              Complete la información del nuevo producto para el inventario
            </DialogDescription>
          </DialogHeader>
          <ProductForm onSubmit={handleCreateProduct} onCancel={() => setIsNewProductDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar producto */}
      <Dialog open={isEditProductDialogOpen} onOpenChange={setIsEditProductDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
            <DialogDescription>
              Actualice la información del producto
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <ProductForm 
              onSubmit={handleUpdateProduct} 
              onCancel={() => setIsEditProductDialogOpen(false)} 
              initialData={selectedProduct}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryManagement;
