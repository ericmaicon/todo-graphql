import { Task, TaskCreate } from '@/types';
import * as taskData from '@/data/task';
import * as userTaskData from '@/data/userTask';

export default async function createTask(userId: number, input: TaskCreate): Promise<Task> {
  const task = await taskData.createOne(input);

  await userTaskData.createOne({
    userId,
    taskId: task.id,
  });

  return task;
}
