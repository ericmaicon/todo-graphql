import { db } from '@/db';
import { userTaskTable } from '@/db/schema';
import { UserTask, UserTaskCreate } from '@/types';

export default async function createOne(input: UserTaskCreate): Promise<UserTask> {
  const items = await db.insert(userTaskTable).values(input).returning();
  return items[0];
}
