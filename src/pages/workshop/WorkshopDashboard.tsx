
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/workshop/Header";
import Navigation from "@/components/workshop/Navigation";
import DashboardContent from "@/components/workshop/dashboard/DashboardContent";
import OrdersManagement from "./orders/OrdersManagement";
import ClientsManagement from "./clients/ClientsManagement";
import SalesManagement from "./sales/SalesManagement";
import InventoryManagement from "./inventory/InventoryManagement";
import SuppliersManagement from "./suppliers/SuppliersManagement";
import TechniciansManagement from "./technicians/TechniciansManagement";

// Mock data for the dashboard
const MOCK_STATS = {
  orders: {
    total: 126,
    pending: 18,
    inProgress: 24,
    completed: 84
  },
  clients: 87,
  technicians: 12,
  suppliers: 8,
  inventory: {
    parts: 342,
    lowStock: 15
  },
  sales: {
    monthly: "$8,500",
    monthlyBs: "Bs. 307,700"
  }
};

const WorkshopDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const userString = localStorage.getItem("currentUser");
    
    if (!userString) {
      navigate("/login");
      return;
    }
    
    const user = JSON.parse(userString);
    
    if (user.role !== "workshop_admin") {
      navigate("/login");
      return;
    }
    
    setCurrentUser(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!currentUser) {
    return <div>Cargando...</div>;
  }

  const getTabTitle = () => {
    switch (activeTab) {
      case "dashboard": return "Panel de Administración del Taller";
      case "orders": return "Gestión de Órdenes";
      case "clients": return "Gestión de Clientes";
      case "technicians": return "Gestión de Técnicos";
      case "inventory": return "Gestión de Inventario";
      case "suppliers": return "Gestión de Proveedores";
      case "sales": return "Gestión de Ventas";
      default: return "Panel de Administración del Taller";
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardContent 
            stats={MOCK_STATS} 
            onViewAllOrders={() => setActiveTab("orders")}
            onNavigate={setActiveTab}
          />
        );
      case "orders":
        return <OrdersManagement />;
      case "clients":
        return <ClientsManagement />;
      case "technicians":
        return <TechniciansManagement />;
      case "inventory":
        return <InventoryManagement />;
      case "suppliers":
        return <SuppliersManagement />;
      case "sales":
        return <SalesManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userName={currentUser.name} 
        onLogout={handleLogout} 
      />

      <div className="container mx-auto py-8 px-4">
        <Navigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          title={getTabTitle()}
        >
          {renderTabContent()}
        </Navigation>
      </div>
    </div>
  );
};

export default WorkshopDashboard;
