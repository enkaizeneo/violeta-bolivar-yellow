// backend/src/lib/sqlite.js
import Database from 'better-sqlite3';

// Usa una ruta absoluta para evitar problemas
const db = new Database('C:/Users/NeoExpertos/Documents/reactTypeScript/violeta-bolivar-yellow/backend/taller.db');

// Ejemplo de inserción (con commit implícito)
export const createWorkshop = (name) => {
  const stmt = db.prepare('INSERT INTO workshops (name) VALUES (?)');
  return stmt.run(name);
};