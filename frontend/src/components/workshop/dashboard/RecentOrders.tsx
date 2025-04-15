
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RecentOrdersProps {
  onViewAllOrders: () => void;
}

const RecentOrders: React.FC<RecentOrdersProps> = ({ onViewAllOrders }) => {
  return (
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
            onClick={onViewAllOrders}
          >
            Ver todas las órdenes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
