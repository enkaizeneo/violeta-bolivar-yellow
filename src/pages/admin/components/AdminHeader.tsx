
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  userName: string;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ userName, onLogout }) => {
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple">
          <span className="text-yellow">Neo</span>Sis
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Admin: {userName}</span>
          <Button variant="outline" size="sm" onClick={onLogout}>
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
