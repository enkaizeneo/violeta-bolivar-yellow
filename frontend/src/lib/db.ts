import sqlite3 from 'better-sqlite3';
import { join } from 'path';

const dbPath = join(process.cwd(), 'database.sqlite');
export const db = sqlite3(dbPath);