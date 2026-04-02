import Link from 'next/link';
import { getAllTasks } from '../../lib/task-db';
import TaskManager from '../../components/task-manager';

export default async function TasksPage() {
  const tasks = getAllTasks();

  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>
        ← Retour à l'accueil
      </Link>

      <TaskManager initialTasks={tasks} />
    </main>
  );
}
