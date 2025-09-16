import tasks from './tasks';

jest.mock('@/data/task');

describe('tasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get the user list of tasks', async () => {
    const response = await tasks(1);
    expect(response).toEqual({
      totalCount: 1,
      items: [
        {
          description: 'Description',
          id: 1,
          status: 'todo',
          title: 'Task 1',
        },
      ],
    });
  });
});
