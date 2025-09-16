const task = {
  id: 1,
  title: 'Task 1',
  description: 'Description',
  status: 'todo',
};

export const createOne = jest.fn(() => Promise.resolve(task));
export const getOne = jest.fn(() => Promise.resolve(task));
export const list = jest.fn(() => Promise.resolve([task]));
export const updateOne = jest.fn(() => Promise.resolve(task));
