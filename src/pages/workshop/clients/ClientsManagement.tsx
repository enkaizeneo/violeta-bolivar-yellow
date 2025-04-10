
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ClientsManagement: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Clientes</CardTitle>
        <CardDescription>
          Administra la información de todos los clientes registrados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center p-8">
          <p className="text-muted-foreground mb-4">
            En esta sección puedes ver y gestionar todos los clientes del taller,
            su información personal y su historial de reparaciones.
          </p>
          <Button className="bg-purple hover:bg-purple-light">
            Registrar Nuevo Cliente
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientsManagement;
