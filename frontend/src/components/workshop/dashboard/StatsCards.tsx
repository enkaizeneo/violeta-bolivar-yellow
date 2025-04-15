
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { FileText, Users, Package, BarChart } from "lucide-react";

interface StatsProps {
  stats: {
    orders: {
      total: number;
      pending: number;
      inProgress: number;
      completed: number;
    };
    clients: number;
    inventory: {
      parts: number;
      lowStock: number;
    };
    sales: {
      monthly: string;
      monthlyBs: string;
    };
  };
}

const StatsCards: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-sm font-medium">Órdenes Totales</CardTitle>
            <CardDescription>Todas las órdenes de reparación</CardDescription>
          </div>
          <FileText className="h-5 w-5 text-purple" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.orders.total}</div>
          <p className="text-xs text-muted-foreground">
            {stats.orders.pending} pendientes, {stats.orders.inProgress} en progreso
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <CardDescription>Clientes registrados</CardDescription>
          </div>
          <Users className="h-5 w-5 text-purple" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.clients}</div>
          <p className="text-xs text-muted-foreground">
            12 nuevos este mes
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-sm font-medium">Inventario</CardTitle>
            <CardDescription>Repuestos disponibles</CardDescription>
          </div>
          <Package className="h-5 w-5 text-purple" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.inventory.parts}</div>
          <p className="text-xs text-muted-foreground">
            {stats.inventory.lowStock} con stock bajo
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="text-sm font-medium">Ventas</CardTitle>
            <CardDescription>Ventas del mes</CardDescription>
          </div>
          <BarChart className="h-5 w-5 text-purple" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.sales.monthly}</div>
          <p className="text-xs text-muted-foreground">
            {stats.sales.monthlyBs}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
