const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(process.cwd(), 'data.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
  );
`);

const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get('user@example.com');
if (!existingUser) {
  const hashedPassword = bcrypt.hashSync('password123', 10);
  db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run('Demo User', 'user@example.com', hashedPassword);
}

const taskCount = db.prepare('SELECT COUNT(*) as count FROM tasks').get();
if (taskCount.count === 0) {
  const insert = db.prepare('INSERT INTO tasks (title, completed) VALUES (?, ?)');
  insert.run('Apprendre Next.js', 0);
  insert.run('Écrire un article sur ISR', 1);
  insert.run('Mettre en place les Server Actions', 0);
}

module.exports = db;
