import { db } from '@/db';
import { test, expect } from '@playwright/test';
import { getAccessToken } from './utils';
import { taskTable, userTable, userTaskTable } from '@/db/schema';

const query = `
query {
  tasks {
    totalCount
    items {
      id
      title
      description
      status
    }
  }
}`;

test('Should receive error when there is no auth header', async ({ request }) => {
  const req = await request.post('/graphql', {
    data: {
      query,
    },
  });

  const response = await req.json();
  expect(req.ok()).toBeTruthy();
  expect(response.errors[0].message).toBe('Not authenticated.');
});

test('Should get the list of tasks from the logged user', async ({ request }) => {
  const [user1, user2] = await db
    .insert(userTable)
    .values([
      {
        username: 'username4',
        password: '$2b$10$ODtiivwpN9t4tepsDlHZPOLVsR8f9RsUNwroAt9Opmj3kG.szQasG',
      },
      {
        username: 'username3',
        password: '$2b$10$ODtiivwpN9t4tepsDlHZPOLVsR8f9RsUNwroAt9Opmj3kG.szQasG',
      },
    ])
    .returning();

  const [task1, task2] = await db
    .insert(taskTable)
    .values([
      { title: 'Task 1', status: 'todo' },
      { title: 'Task 2', status: 'todo' },
    ])
    .returning();

  await db
    .insert(userTaskTable)
    .values([
      { taskId: task1.id, userId: user1.id },
      { taskId: task2.id, userId: user2.id },
    ])
    .returning();

  const accessToken = await getAccessToken(request, 'username4');
  const req = await request.post('/graphql', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      query,
    },
  });
  expect(req.ok()).toBeTruthy();
  const response = await req.json();
  expect(response.data.tasks.totalCount).toBe(1);
  expect(response.data.tasks.items[0].id).toBe(task1.id.toString());
});
