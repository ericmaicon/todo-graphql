const userTask = {
  id: 1,
  userId: 1,
  taskId: 1,
};

export const createOne = jest.fn(() => Promise.resolve(userTask));
