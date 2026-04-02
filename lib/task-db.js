let tasks = [
  { id: '1', title: 'Apprendre Next.js', completed: false },
  { id: '2', title: 'Écrire un article sur ISR', completed: true },
  { id: '3', title: 'Mettre en place les Server Actions', completed: false }
];

const randomId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export function getAllTasks() {
  return [...tasks];
}

export function createTaskInDb(data) {
  const newTask = { id: randomId(), ...data };
  tasks = [newTask, ...tasks];
  return newTask;
}

export function updateTaskInDb(id, data) {
  let updated = null;
  tasks = tasks.map((task) => {
    if (task.id === id) {
      updated = { ...task, ...data };
      return updated;
    }
    return task;
  });
  return updated;
}

export function deleteTaskInDb(id) {
  const beforeLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  return tasks.length < beforeLength;
}
