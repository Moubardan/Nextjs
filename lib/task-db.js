const db = require('./db');

export function getAllTasks() {
  return db.prepare('SELECT * FROM tasks ORDER BY id DESC').all().map((t) => ({
    ...t,
    id: String(t.id),
    completed: !!t.completed,
  }));
}

export function createTaskInDb(data) {
  const result = db.prepare('INSERT INTO tasks (title, completed) VALUES (?, ?)').run(data.title, data.completed ? 1 : 0);
  return { id: String(result.lastInsertRowid), title: data.title, completed: !!data.completed };
}

export function updateTaskInDb(id, data) {
  const sets = [];
  const values = [];
  if (data.title !== undefined) { sets.push('title = ?'); values.push(data.title); }
  if (data.completed !== undefined) { sets.push('completed = ?'); values.push(data.completed ? 1 : 0); }
  values.push(id);

  db.prepare(`UPDATE tasks SET ${sets.join(', ')} WHERE id = ?`).run(...values);
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  if (!task) return null;
  return { id: String(task.id), title: task.title, completed: !!task.completed };
}

export function deleteTaskInDb(id) {
  const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  return result.changes > 0;
}
