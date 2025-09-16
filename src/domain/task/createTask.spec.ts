import createTask from './createTask';
import * as taskData from '@/data/task';
import * as userTaskData from '@/data/userTask';

jest.mock('@/data/task');
jest.mock('@/data/userTask');

describe('createTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create the task and the user in the user_task table', async () => {
    const response = await createTask(1, {
      title: 'Task',
      description: 'something',
      status: 'todo',
    });

    expect(taskData.createOne).toHaveBeenCalledWith({
      title: 'Task',
      description: 'something',
      status: 'todo',
    });
    expect(userTaskData.createOne).toHaveBeenCalledWith({
      userId: 1,
      taskId: 1,
    });
    expect(response).toEqual({
      description: 'Description',
      id: 1,
      status: 'todo',
      title: 'Task 1',
    });
  });
});
