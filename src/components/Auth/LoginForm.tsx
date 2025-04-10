
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type UserRole = "admin" | "workshop_admin" | "client";

interface User {
  id: string;
  name: string;
  role: UserRole;
  documentId?: string; // Cédula de identidad para clientes
}

// Mock usuarios para demostración
const MOCK_USERS: User[] = [
  { id: "1", name: "Admin Principal", role: "admin" },
  { id: "2", name: "Gerente Taller Central", role: "workshop_admin" },
  { id: "3", name: "Cliente Ejemplo", role: "client", documentId: "V12345678" },
];

const LoginForm = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación de autenticación
    const user = MOCK_USERS.find(u => 
      u.role === "client" ? u.documentId === identifier : u.id === identifier
    );

    if (!user) {
      toast.error("Usuario no encontrado");
      return;
    }

    // Simulación de primer ingreso para clientes
    if (user.role === "client" && password === "primeringreso") {
      setIsFirstLogin(true);
      return;
    }

    // Simulación de login exitoso
    if (password === "123456" || (isFirstLogin && newPassword === confirmPassword)) {
      // Almacenar información del usuario en localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
      
      // Redireccionar según el rol
      toast.success(`Bienvenido, ${user.name}`);
      
      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "workshop_admin":
          navigate("/taller");
          break;
        case "client":
          navigate("/cliente");
          break;
      }
    } else {
      toast.error("Contraseña incorrecta");
    }
  };

  const handleCreatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    // Buscar el usuario
    const user = MOCK_USERS.find(u => u.documentId === identifier);
    if (user) {
      // Almacenar información del usuario
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success("Contraseña creada exitosamente");
      navigate("/cliente");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {isFirstLogin ? "Crear Contraseña" : "Iniciar Sesión"}
        </CardTitle>
        <CardDescription className="text-center">
          {isFirstLogin 
            ? "Es tu primer ingreso, por favor crea una contraseña" 
            : "Ingresa tus credenciales para acceder al sistema"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isFirstLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">
                {identifier.startsWith("V") || identifier === "" 
                  ? "Cédula de Identidad (Para clientes)" 
                  : "ID de Usuario (Para administradores)"}
              </Label>
              <Input 
                id="identifier"
                placeholder="Ej: V12345678 o tu ID de usuario" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="Ingresa tu contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {identifier.startsWith("V") && (
                <p className="text-xs text-muted-foreground">
                  Primer ingreso: usa "primeringreso" como contraseña
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">Ingresar</Button>
          </form>
        ) : (
          <form onSubmit={handleCreatePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nueva Contraseña</Label>
              <Input 
                id="newPassword"
                type="password" 
                placeholder="Crea una contraseña" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input 
                id="confirmPassword"
                type="password" 
                placeholder="Confirma tu contraseña" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Crear Contraseña</Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          variant="link" 
          className="text-sm text-muted-foreground"
          onClick={() => navigate("/")}
        >
          Volver al Inicio
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
