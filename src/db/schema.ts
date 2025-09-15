import { integer, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core';

export const taskStatusEnum = pgEnum('status', ['todo', 'inProgress', 'done', 'archived']);

export const userTable = pgTable('user', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
});

export const taskTable = pgTable('task', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  status: taskStatusEnum('status').notNull(),
});

export const userTaskTable = pgTable('user_task', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id),
  taskId: integer('task_id')
    .notNull()
    .references(() => taskTable.id),
});
