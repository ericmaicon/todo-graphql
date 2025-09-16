import * as taskData from '@/data/task';

export default function tasks(userId: number) {
  // paginate
  return taskData.list({
    userId,
  });
}
