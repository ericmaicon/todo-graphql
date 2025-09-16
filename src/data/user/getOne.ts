import { db } from '@/db';
import { userTable } from '@/db/schema';
import { User } from '@/types';
import { eq } from 'drizzle-orm';

type Input = {
  username: string;
};

export default async function getOne(input: Input): Promise<User | null> {
  const { username } = input;

  const items = await db.select().from(userTable).where(eq(userTable.username, username)).limit(1);
  if (items.length === 0) {
    return null;
  }

  return items[0];
}
