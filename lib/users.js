const db = require('./db');
const bcrypt = require('bcryptjs');

export function findUserByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE LOWER(email) = LOWER(?)').get(email);
}

export function findUserById(id) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
}

export function createUser({ name, email, password }) {
  const existing = findUserByEmail(email);
  if (existing) throw new Error('Email already registered');

  const hashedPassword = bcrypt.hashSync(password, 10);
  const result = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(name, email, hashedPassword);
  return { id: String(result.lastInsertRowid), name, email };
}

export function verifyUser({ email, password }) {
  const user = findUserByEmail(email);
  if (!user) return null;
  if (!bcrypt.compareSync(password, user.password)) return null;
  return { id: String(user.id), name: user.name, email: user.email };
}