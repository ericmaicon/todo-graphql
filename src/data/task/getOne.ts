import { db } from '@/db';
import { taskTable } from '@/db/schema';
import { Task } from '@/types';
import { eq } from 'drizzle-orm';

type Input = {
  id: number;
};

export default async function getOne(input: Input): Promise<Task | null> {
  const { id } = input;

  const items = await db.select().from(taskTable).where(eq(taskTable.id, id)).limit(1);
  if (items.length === 0) {
    return null;
  }

  return items[0];
}
