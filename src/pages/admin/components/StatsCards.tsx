
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Workshop } from "@/components/admin/WorkshopForm";

interface StatsCardsProps {
  workshops: Workshop[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ workshops }) => {
  const activeWorkshops = workshops.filter(w => w.status === "active").length;
  const pendingWorkshops = workshops.filter(w => w.status === "pending").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Talleres</CardTitle>
          <CardDescription>Total registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{workshops.length}</div>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            {activeWorkshops} activos
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Solicitudes</CardTitle>
          <CardDescription>Pendientes de aprobación</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{pendingWorkshops}</div>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Actualizado hoy
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Estadísticas</CardTitle>
          <CardDescription>Rendimiento del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">98%</div>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Tiempo de actividad
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StatsCards;
