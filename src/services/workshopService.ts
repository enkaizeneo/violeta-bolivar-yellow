
import { supabase } from '@/lib/supabase';
import { Workshop } from '@/components/admin/WorkshopForm';

export const fetchWorkshops = async (): Promise<Workshop[]> => {
  const { data, error } = await supabase
    .from('workshops')
    .select('*');
  
  if (error) {
    console.error('Error fetching workshops:', error);
    throw new Error(error.message);
  }
  
  return data || [];
};

export const createWorkshop = async (workshop: Omit<Workshop, 'id' | 'registrationDate'>): Promise<Workshop> => {
  const newWorkshop = {
    ...workshop,
    registrationDate: new Date().toISOString().split('T')[0]
  };
  
  const { data, error } = await supabase
    .from('workshops')
    .insert([newWorkshop])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating workshop:', error);
    throw new Error(error.message);
  }
  
  return data;
};

export const updateWorkshop = async (id: number, workshop: Partial<Omit<Workshop, 'id' | 'registrationDate'>>): Promise<Workshop> => {
  const { data, error } = await supabase
    .from('workshops')
    .update(workshop)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating workshop:', error);
    throw new Error(error.message);
  }
  
  return data;
};

export const deleteWorkshop = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('workshops')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting workshop:', error);
    throw new Error(error.message);
  }
};
