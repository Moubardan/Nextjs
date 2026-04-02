'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { createTaskInDb, updateTaskInDb, deleteTaskInDb } from '../../lib/task-db';

const taskInputSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(200),
  completed: z.boolean().optional().default(false)
});

const updateTaskSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1, 'Le titre est requis').max(200),
  completed: z.boolean().optional().default(false)
});

const idSchema = z.object({
  id: z.string().min(1)
});

function normalizeInput(raw) {
  if (raw instanceof FormData) {
    return {
      title: raw.get('title')?.toString().trim() ?? '',
      completed: raw.get('completed') === 'on'
    };
  }

  return {
    title: raw?.title?.toString().trim() ?? '',
    completed: typeof raw?.completed === 'boolean' ? raw.completed : false
  };
}

export async function createTaskAction(rawInput) {
  try {
    const data = normalizeInput(rawInput);
    const parsed = taskInputSchema.safeParse(data);

    if (!parsed.success) {
      return { success: false, error: parsed.error.flatten().fieldErrors };
    }

    const task = createTaskInDb(parsed.data);
    revalidatePath('/tasks');
    return { success: true, data: task };
  } catch (error) {
    return { success: false, error: (error instanceof Error ? error.message : 'Erreur inconnue') };
  }
}

export async function updateTaskAction(rawInput) {
  try {
    const data = rawInput instanceof FormData
      ? {
          id: rawInput.get('id')?.toString() ?? '',
          title: rawInput.get('title')?.toString().trim() ?? '',
          completed: rawInput.get('completed') === 'on'
        }
      : rawInput;

    const parsed = updateTaskSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.flatten().fieldErrors };
    }

    const updated = updateTaskInDb(parsed.data.id, {
      title: parsed.data.title,
      completed: parsed.data.completed
    });

    if (!updated) {
      return { success: false, error: 'Tâche introuvable' };
    }

    revalidatePath('/tasks');
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: (error instanceof Error ? error.message : 'Erreur inconnue') };
  }
}

export async function deleteTaskAction(rawInput) {
  try {
    const idValue = rawInput instanceof FormData ? rawInput.get('id')?.toString() ?? '' : rawInput?.id;
    const parsed = idSchema.safeParse({ id: idValue });

    if (!parsed.success) {
      return { success: false, error: parsed.error.flatten().fieldErrors };
    }

    const deleted = deleteTaskInDb(parsed.data.id);
    if (!deleted) {
      return { success: false, error: 'Tâche introuvable ou déjà supprimée' };
    }

    revalidatePath('/tasks');
    return { success: true, data: { id: parsed.data.id } };
  } catch (error) {
    return { success: false, error: (error instanceof Error ? error.message : 'Erreur inconnue') };
  }
}
