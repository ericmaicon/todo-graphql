import { taskTable, userTable, userTaskTable } from './db/schema';

export type User = typeof userTable.$inferSelect;

export type Task = typeof taskTable.$inferSelect;
export type TaskCreate = typeof taskTable.$inferInsert;
export type TaskUpdate = {
  status: 'todo' | 'inProgress' | 'done' | 'archived';
};

export type UserTask = typeof userTaskTable.$inferSelect;
export type UserTaskCreate = typeof userTaskTable.$inferInsert;
