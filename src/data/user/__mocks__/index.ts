const user = {
  id: 1,
  username: 'username',
  password: '$2b$10$ODtiivwpN9t4tepsDlHZPOLVsR8f9RsUNwroAt9Opmj3kG.szQasG', // password
};

export const getOne = jest.fn(() => Promise.resolve(user));
