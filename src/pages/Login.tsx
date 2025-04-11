
import React from "react";
import LoginForm from "@/components/Auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-yellow">Neo</span>
            <span className="text-purple">Sis</span>
          </h1>
          <p className="text-muted-foreground">Sistema de Gestión de Reparaciones</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
