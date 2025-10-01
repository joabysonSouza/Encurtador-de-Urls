import Database from 'better-sqlite3'


const db = new Database('urls.db');
db.pragma("journal_mode = WAL");

db.exec(`
    CREATE TABLE IF NO EXISTS urls(
    slug TEXT PRIMARY KEY,
    original_url TEXT NOT NULL,
    create_at TEXT DEFAULT (datatime('now'))

    ); 
    
  `);

  export default db