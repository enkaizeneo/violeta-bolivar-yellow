
// Define shared types for order-related components
export interface Client {
  id: number;
  name: string;
  ci: string;
}

export interface Technician {
  id: number;
  name: string;
}

export interface OrderFormData {
  client: string;
  deviceType: string;
  brand: string;
  model: string;
  serial: string;
  issue: string;
  observations: string;
  technician: string;
}

export interface OrderFormProps {
  onSubmit: (data: OrderFormData) => void;
  onCancel: () => void;
  initialData?: Partial<OrderFormData>;
}
