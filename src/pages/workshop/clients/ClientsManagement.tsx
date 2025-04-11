
import React, { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Pencil, Trash, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import ClientForm, { Client } from "@/components/workshop/clients/ClientForm";

// Mock data de clientes
const INITIAL_CLIENTS: Client[] = [
  { id: 1, name: "Juan Pérez", ci: "V-12345678", email: "juan@example.com", phone: "+58 412-1234567", address: "Caracas, Venezuela" },
  { id: 2, name: "María López", ci: "V-23456789", email: "maria@example.com", phone: "+58 414-2345678", address: "Valencia, Venezuela" },
  { id: 3, name: "Pedro Gomez", ci: "V-34567890", email: "pedro@example.com", phone: "+58 424-3456789", address: "Maracay, Venezuela" }
];

const ClientsManagement: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | undefined>(undefined);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.ci.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    setCurrentClient(undefined);
    setFormOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setCurrentClient(client);
    setFormOpen(true);
  };

  const handleSaveClient = (clientData: Omit<Client, 'id'>) => {
    if (currentClient) {
      // Actualizar cliente existente
      setClients(clients.map(c => 
        c.id === currentClient.id 
          ? { ...c, ...clientData }
          : c
      ));
      toast.success("Cliente actualizado con éxito");
    } else {
      // Agregar nuevo cliente
      const newClient: Client = {
        id: Math.max(...clients.map(c => c.id), 0) + 1,
        ...clientData
      };
      
      setClients([...clients, newClient]);
      toast.success("Cliente registrado con éxito");
    }
    
    setFormOpen(false);
  };

  const handleDeleteClient = (id: number) => {
    setClients(clients.filter(c => c.id !== id));
    setDeleteConfirmId(null);
    toast.success("Cliente eliminado con éxito");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Clientes</CardTitle>
        <CardDescription>
          Administra la información de todos los clientes registrados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button 
            className="bg-purple hover:bg-purple-light"
            onClick={handleAddClient}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Registrar Nuevo Cliente
          </Button>
        </div>

        {filteredClients.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>C.I.</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.id}</TableCell>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.ci}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditClient(client)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600"
                          onClick={() => setDeleteConfirmId(client.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                        
                        {deleteConfirmId === client.id && (
                          <div className="flex space-x-2">
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteClient(client.id)}
                            >
                              Confirmar
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setDeleteConfirmId(null)}
                            >
                              Cancelar
                            </Button>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No se encontraron clientes con ese criterio de búsqueda.</p>
          </div>
        )}
        
        <ClientForm 
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSave={handleSaveClient}
          client={currentClient}
        />
      </CardContent>
    </Card>
  );
};

export default ClientsManagement;
