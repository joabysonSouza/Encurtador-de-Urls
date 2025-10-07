import Database from 'better-sqlite3'


const db = new Database('urls.db');
db.pragma("journal_mode = WAL");

db.exec(`
    CREATE TABLE IF NOT EXISTS urls(
    slug TEXT PRIMARY KEY,
    original_url TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
    ); 
    
  `);

  export default db