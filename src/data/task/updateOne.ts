import { db } from '@/db';
import { taskTable } from '@/db/schema';
import { Task, TaskUpdate } from '@/types';
import { eq } from 'drizzle-orm';

export default async function updateOne(id: number, input: TaskUpdate): Promise<Task> {
  const { status } = input;

  const items = await db.update(taskTable).set({ status }).where(eq(taskTable.id, id)).returning();
  return items[0];
}
