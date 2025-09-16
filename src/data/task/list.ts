import { db } from '@/db';
import { taskTable, userTaskTable } from '@/db/schema';
import { and, count, eq, exists, SQL } from 'drizzle-orm';

type Input = {
  userId: number;
  pageSize?: number;
  page?: number;
};

export default async function list(params: Input) {
  const { userId, pageSize = 10, page = 1 } = params;

  const conditions: SQL[] = [
    exists(
      db
        .select()
        .from(userTaskTable)
        .where(and(eq(userTaskTable.taskId, taskTable.id), eq(userTaskTable.userId, userId))),
    ),
  ];
  const condition = and(...conditions);

  const offset = (page - 1) * pageSize;
  const items = await db.select().from(taskTable).limit(pageSize).where(condition).offset(offset);
  const totalCount = await db.select({ count: count() }).from(taskTable).where(condition);

  return {
    items,
    totalCount: Number(totalCount[0]?.count ?? 0),
  };
}
