import updateTask from './updateTask';
import * as taskData from '@/data/task';

jest.mock('@/data/task');

describe('updateTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw if task does not exist', async () => {
    (taskData.getOne as jest.Mock).mockResolvedValueOnce(null);

    await expect(updateTask(1, { status: 'done' })).rejects.toThrow('Task not found.');
  });

  it('should update the task', async () => {
    const response = await updateTask(1, { status: 'done' });
    expect(taskData.updateOne).toHaveBeenCalledWith(1, {
      status: 'done',
    });
    expect(response).toEqual({
      description: 'Description',
      id: 1,
      status: 'todo',
      title: 'Task 1',
    });
  });
});
