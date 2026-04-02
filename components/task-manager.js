'use client';

import { useState, useTransition } from 'react';
import { createTaskAction, updateTaskAction, deleteTaskAction } from '@/app/tasks/actions';

export default function TaskManager({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  async function handleCreate(event) {
    event.preventDefault();
    setMessage(null);
    setError(null);

    const form = new FormData(event.target);
    startTransition(async () => {
      const result = await createTaskAction(form);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setTasks((current) => [result.data, ...current]);
      setMessage('Tâche créée avec succès.');
      event.target.reset();
    });
  }

  async function handleUpdate(event, id) {
    event.preventDefault();
    setMessage(null);
    setError(null);

    const form = new FormData(event.target);
    startTransition(async () => {
      const result = await updateTaskAction(form);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setTasks((current) => current.map((task) => (task.id === id ? result.data : task)));
      setMessage('Tâche mise à jour avec succès.');
    });
  }

  async function handleDelete(id) {
    setMessage(null);
    setError(null);

    startTransition(async () => {
      const result = await deleteTaskAction({ id });
      if (!result.success) {
        setError(result.error);
        return;
      }
      setTasks((current) => current.filter((task) => task.id !== id));
      setMessage('Tâche supprimée avec succès.');
    });
  }

  const renderFieldError = (field) => {
    if (!error || !error[field]) return null;
    return <div style={{ color: '#b00020', marginTop: '0.2rem' }}>{error[field].join(', ')}</div>;
  };

  return (
    <section style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>CRUD Tâches (Client + Server Actions)</h1>
      <p>Les erreurs Zod et statuts sont affichés sous les formulaires.</p>

      {message && <div style={{ color: '#155724', background: '#d4edda', marginBottom: '1rem', padding: '0.75rem', borderRadius: '5px' }}>{message}</div>}
      {error && typeof error === 'string' && <div style={{ color: '#721c24', background: '#f8d7da', marginBottom: '1rem', padding: '0.75rem', borderRadius: '5px' }}>{error}</div>}
      {error && typeof error !== 'string' && (
        <div style={{ color: '#721c24', background: '#f8d7da', marginBottom: '1rem', padding: '0.75rem', borderRadius: '5px' }}>
          {Object.entries(error).map(([field, messages]) => (
            <div key={field}>
              <strong>{field}:</strong> {Array.isArray(messages) ? messages.join(', ') : String(messages)}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleCreate} style={{ marginBottom: '1.5rem', display: 'grid', gap: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input name="title" placeholder="Titre de la tâche" style={{ flex: '1', padding: '0.5rem 0.75rem' }} />
          <button type="submit" disabled={isPending} style={{ padding: '0.6rem 1rem' }}>
            {isPending ? 'Envoi...' : 'Créer'}
          </button>
        </div>
        {renderFieldError('title')}
      </form>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {tasks.map((task) => (
          <article key={task.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <form onSubmit={(event) => handleUpdate(event, task.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="hidden" name="id" value={task.id} />
              <input type="text" name="title" defaultValue={task.title} style={{ flex: '1', padding: '0.45rem' }} />
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <input name="completed" type="checkbox" defaultChecked={task.completed} />
                Terminé
              </label>
              <button type="submit" disabled={isPending} style={{ padding: '0.35rem 0.8rem' }}>
                {isPending ? '...' : 'Update'}
              </button>
              <button type="button" onClick={() => handleDelete(task.id)} style={{ padding: '0.35rem 0.8rem', backgroundColor: '#f8d7da', border: '1px solid #f5c2c7' }}>
                Supprimer
              </button>
            </form>
          </article>
        ))}
      </div>
    </section>
  );
}
