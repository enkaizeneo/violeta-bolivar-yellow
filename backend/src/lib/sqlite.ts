// src/lib/sqlite.ts
import Database from 'better-sqlite3';

const db = new Database('taller.db');

// Crea la tabla workshops si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS workshops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    registrationDate TEXT NOT NULL
  );
`);

export default db;