
import React from "react";
import StatsCards from "./StatsCards";
import RecentOrders from "./RecentOrders";
import QuickActions from "./QuickActions";

interface DashboardContentProps {
  stats: {
    orders: {
      total: number;
      pending: number;
      inProgress: number;
      completed: number;
    };
    clients: number;
    technicians: number;
    suppliers: number;
    inventory: {
      parts: number;
      lowStock: number;
    };
    sales: {
      monthly: string;
      monthlyBs: string;
    };
  };
  onViewAllOrders: () => void;
  onNavigate: (tab: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ 
  stats, 
  onViewAllOrders, 
  onNavigate 
}) => {
  return (
    <>
      <StatsCards stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RecentOrders onViewAllOrders={onViewAllOrders} />
        <QuickActions onNavigate={onNavigate} />
      </div>
    </>
  );
};

export default DashboardContent;
