// frontend/src/services/workshopService.ts
import { Workshop } from '@/components/admin/WorkshopForm';

const API_BASE_URL = 'http://localhost:3001/api/workshops';

// Configuración común para fetch
const fetchConfig = (method: string, body?: any): RequestInit => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}` // Si usas autenticación
  },
  body: body ? JSON.stringify(body) : null,
  credentials: 'include' // Si usas cookies
});

// Handler genérico para errores HTTP
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error en la solicitud');
  }
  return response.json();
};

export const fetchWorkshops = async (): Promise<Workshop[]> => {
  try {
    const response = await fetch(API_BASE_URL, fetchConfig('GET'));
    return handleResponse<Workshop[]>(response);
  } catch (error) {
    console.error('Error fetching workshops:', error);
    throw error;
  }
};

export const createWorkshop = async (
  workshop: Omit<Workshop, 'id' | 'registrationDate'>
): Promise<Workshop> => {
  try {
    const newWorkshop = {
      ...workshop,
      registrationDate: new Date().toISOString().split('T')[0]
    };

    const response = await fetch(API_BASE_URL, {
      ...fetchConfig('POST'),
      body: JSON.stringify(newWorkshop)
    });

    return handleResponse<Workshop>(response);
  } catch (error) {
    console.error('Error creating workshop:', error);
    throw error;
  }
};

export const updateWorkshop = async (
  id: number,
  workshop: Partial<Omit<Workshop, 'id' | 'registrationDate'>>
): Promise<Workshop> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      ...fetchConfig('PUT'),
      body: JSON.stringify(workshop)
    });

    return handleResponse<Workshop>(response);
  } catch (error) {
    console.error('Error updating workshop:', error);
    throw error;
  }
};

export const deleteWorkshop = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, fetchConfig('DELETE'));
    await handleResponse<void>(response);
  } catch (error) {
    console.error('Error deleting workshop:', error);
    throw error;
  }
};

// Función adicional para búsqueda avanzada (ejemplo de extensión)
export const searchWorkshops = async (
  filters: Record<string, any>
): Promise<Workshop[]> => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE_URL}/search?${queryParams}`, fetchConfig('GET'));
    return handleResponse<Workshop[]>(response);
  } catch (error) {
    console.error('Error searching workshops:', error);
    throw error;
  }
};

// Función para paginación (ejemplo de extensión)
export const fetchPaginatedWorkshops = async (
  page: number,
  pageSize: number
): Promise<{ data: Workshop[]; total: number }> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}?page=${page}&pageSize=${pageSize}`,
      fetchConfig('GET')
    );
    return handleResponse<{ data: Workshop[]; total: number }>(response);
  } catch (error) {
    console.error('Error fetching paginated workshops:', error);
    throw error;
  }
};
