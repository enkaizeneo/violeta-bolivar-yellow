
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  FileText, 
  User, 
  Wrench, 
  Package, 
  Truck,
  ShoppingCart
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  title: string;
  children: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeTab, 
  onTabChange, 
  title,
  children
}) => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6">{title}</h2>

      <Tabs value={activeTab} onValueChange={onTabChange} className="mb-8">
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
          {children}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Navigation;
