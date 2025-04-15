
export interface Technician {
  id?: string | number;
  name: string;
  ci: string;
  specialties: string[];
  phone: string;
  email: string;
  status: string;
  orders: number;
  rating: number;
}

export type TechnicianFormData = Technician;
