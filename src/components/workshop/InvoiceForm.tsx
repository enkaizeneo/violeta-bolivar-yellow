
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Datos de ejemplo
const MOCK_CLIENTS = [
  { id: 1, name: "Juan Pérez", ci: "V-12345678" },
  { id: 2, name: "María López", ci: "V-23456789" },
  { id: 3, name: "Pedro Gomez", ci: "V-34567890" }
];

const MOCK_PRODUCTS = [
  { id: 1, name: "Batería laptop HP", price: 80.00 },
  { id: 2, name: "Pantalla iPhone 13", price: 180.00 },
  { id: 3, name: "Teclado mecánico", price: 45.00 },
  { id: 4, name: "Mouse inalámbrico", price: 25.00 },
  { id: 5, name: "Adaptador HDMI", price: 15.00 },
  { id: 6, name: "Servicio de instalación", price: 40.00 },
  { id: 7, name: "Diagnóstico", price: 20.00 },
  { id: 8, name: "Limpieza de componentes", price: 30.00 }
];

interface InvoiceFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ 
  onSubmit, 
  onCancel,
  initialData = {} 
}) => {
  const [client, setClient] = useState(initialData.client || '');
  const [items, setItems] = useState<Array<{name: string, quantity: number, price: number}>>(
    initialData.items || []
  );
  const [newItem, setNewItem] = useState({
    product: '',
    quantity: 1,
    price: 0
  });

  const handleAddItem = () => {
    if (!newItem.product) return;
    
    const selectedProduct = MOCK_PRODUCTS.find(p => p.name === newItem.product);
    
    if (selectedProduct) {
      const itemToAdd = {
        name: selectedProduct.name,
        quantity: newItem.quantity,
        price: selectedProduct.price
      };
      
      setItems([...items, itemToAdd]);
      setNewItem({
        product: '',
        quantity: 1,
        price: 0
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!client || items.length === 0) return;
    
    onSubmit({
      client,
      items,
      total: calculateTotal()
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="client" className="text-right">
            Cliente:
          </Label>
          <div className="col-span-3">
            <Select 
              onValueChange={setClient}
              defaultValue={client || undefined}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un cliente" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_CLIENTS.map(c => (
                  <SelectItem key={c.id} value={c.name}>
                    {c.name} ({c.ci})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border rounded-md p-4 mt-4">
          <h4 className="font-medium mb-2">Productos y Servicios</h4>
          
          {items.length > 0 && (
            <div className="mb-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto/Servicio</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-500 p-0 h-auto"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-end mt-2">
                <div className="text-right">
                  <div className="font-medium">Total: ${calculateTotal().toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">
                    IVA (16%): ${(calculateTotal() * 0.16).toFixed(2)}
                  </div>
                  <div className="font-bold mt-1">
                    Total con IVA: ${(calculateTotal() * 1.16).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-5">
              <Label htmlFor="product" className="text-sm">
                Producto/Servicio
              </Label>
              <Select 
                onValueChange={(value) => setNewItem({...newItem, product: value})}
                value={newItem.product || undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_PRODUCTS.map(product => (
                    <SelectItem key={product.id} value={product.name}>
                      {product.name} - ${product.price.toFixed(2)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="quantity" className="text-sm">
                Cantidad
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={newItem.quantity}
                onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 1})}
              />
            </div>
            <div className="col-span-3">
              <Label htmlFor="price" className="text-sm">
                Precio ($)
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={MOCK_PRODUCTS.find(p => p.name === newItem.product)?.price || 0}
                disabled
              />
            </div>
            <div className="col-span-2">
              <Button 
                type="button" 
                onClick={handleAddItem} 
                className="w-full"
                disabled={!newItem.product}
              >
                <Plus className="h-4 w-4 mr-1" />
                Añadir
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button 
          type="submit"
          disabled={!client || items.length === 0}
        >
          Guardar Factura
        </Button>
      </DialogFooter>
    </form>
  );
};

export default InvoiceForm;
