import db from '../lib/sqlite';

export const searchWorkshops = async (filters: any) => {
  let query = 'SELECT * FROM workshops WHERE 1=1';
  const params: any[] = [];

  Object.entries(filters).forEach(([key, value]) => {
    query += ` AND ${key} LIKE ?`;
    params.push(`%${value}%`);
  });

  return db.prepare(query).all(params);
};

export const getPaginatedWorkshops = async (page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize;
  const data = db.prepare('SELECT * FROM workshops LIMIT ? OFFSET ?').all(pageSize, offset);
  const total = db.prepare('SELECT COUNT(*) as total FROM workshops').get().total;
  
  return { data, total };
};