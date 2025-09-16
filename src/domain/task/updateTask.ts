import { Task, TaskUpdate } from '@/types';
import * as taskData from '@/data/task';
import AppError from '@/error/AppError';

export default async function updateTask(id: number, input: TaskUpdate): Promise<Task> {
  const task = await taskData.getOne({ id });

  if (!task) {
    throw new AppError('Task not found.');
  }

  await taskData.updateOne(id, input);
  return task;
}
