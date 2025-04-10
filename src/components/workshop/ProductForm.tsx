
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
import { Textarea } from "@/components/ui/textarea";

// Datos de ejemplo
const PRODUCT_CATEGORIES = [
  "Baterías", 
  "Pantallas", 
  "Memorias", 
  "Procesadores", 
  "Discos duros", 
  "Periféricos", 
  "Cables y adaptadores", 
  "Accesorios",
  "Otros"
];

const MOCK_SUPPLIERS = [
  { id: 1, name: "TecnoPartes C.A." },
  { id: 2, name: "CompuMax S.A." },
  { id: 3, name: "Apple Parts Inc." },
  { id: 4, name: "Importadora Digital" }
];

interface ProductFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  onSubmit, 
  onCancel,
  initialData = {} 
}) => {
  const [formData, setFormData] = useState({
    id: initialData.id || undefined,
    name: initialData.name || '',
    category: initialData.category || '',
    description: initialData.description || '',
    stock: initialData.stock !== undefined ? initialData.stock : 0,
    minStock: initialData.minStock !== undefined ? initialData.minStock : 3,
    buyPrice: initialData.buyPrice !== undefined ? initialData.buyPrice : 0,
    sellPrice: initialData.sellPrice !== undefined ? initialData.sellPrice : 0,
    supplier: initialData.supplier || '',
    location: initialData.location || '',
    sku: initialData.sku || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Manejar los inputs numéricos correctamente
    if (name === 'stock' || name === 'minStock') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else if (name === 'buyPrice' || name === 'sellPrice') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que los campos requeridos no estén vacíos
    if (!formData.name || !formData.category || !formData.supplier) return;
    
    onSubmit(formData);
  };

  // Calcular ganancia y margen
  const profit = formData.sellPrice - formData.buyPrice;
  const margin = formData.buyPrice ? (profit / formData.buyPrice) * 100 : 0;

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name">Nombre del Producto*</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="category">Categoría*</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('category', value)}
              defaultValue={formData.category || undefined}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {PRODUCT_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="mt-1"
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="sku">SKU / Código</Label>
            <Input
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="supplier">Proveedor*</Label>
            <Select 
              onValueChange={(value) => handleSelectChange('supplier', value)}
              defaultValue={formData.supplier || undefined}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Seleccionar proveedor" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_SUPPLIERS.map(supplier => (
                  <SelectItem key={supplier.id} value={supplier.name}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <Label htmlFor="stock">Cantidad en Stock*</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="minStock">Stock Mínimo*</Label>
            <Input
              id="minStock"
              name="minStock"
              type="number"
              min="0"
              value={formData.minStock}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1"
              placeholder="Ej.: Estante A, Gaveta 3"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <Label htmlFor="buyPrice">Precio de Compra ($)*</Label>
            <Input
              id="buyPrice"
              name="buyPrice"
              type="number"
              min="0"
              step="0.01"
              value={formData.buyPrice}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="sellPrice">Precio de Venta ($)*</Label>
            <Input
              id="sellPrice"
              name="sellPrice"
              type="number"
              min="0"
              step="0.01"
              value={formData.sellPrice}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Label>Ganancia</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="p-2 bg-gray-100 rounded text-center">
                <span className="text-sm font-medium">${profit.toFixed(2)}</span>
              </div>
              <div className="p-2 bg-gray-100 rounded text-center">
                <span className="text-sm font-medium">{margin.toFixed(0)}%</span>
              </div>
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
          disabled={!formData.name || !formData.category || !formData.supplier}
        >
          {initialData.id ? 'Actualizar' : 'Guardar'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ProductForm;
