import { db } from '@/db';
import { taskTable } from '@/db/schema';
import { Task, TaskCreate } from '@/types';

export default async function createOne(input: TaskCreate): Promise<Task> {
  const items = await db.insert(taskTable).values(input).returning();
  return items[0];
}
