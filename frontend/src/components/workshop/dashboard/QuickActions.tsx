
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ShoppingCart, Package, Wrench, Printer } from "lucide-react";

interface QuickActionsProps {
  onNavigate: (tab: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onNavigate }) => {
  return (
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
            onClick={() => onNavigate("orders")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Nueva Orden
          </Button>
          <Button 
            className="w-full justify-start" 
            variant="outline"
            onClick={() => onNavigate("sales")}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Nueva Factura
          </Button>
          <Button 
            className="w-full justify-start" 
            variant="outline"
            onClick={() => onNavigate("inventory")}
          >
            <Package className="mr-2 h-4 w-4" />
            Actualizar Inventario
          </Button>
          <Button 
            className="w-full justify-start" 
            variant="outline"
            onClick={() => onNavigate("technicians")}
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
  );
};

export default QuickActions;
