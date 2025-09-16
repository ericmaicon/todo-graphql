import { db } from '@/db';
import { test, expect } from '@playwright/test';
import { getAccessToken } from './utils';

const query = `
mutation($input: CreateTaskDAO!) {
  createTask(input: $input) {
    id
    title
    description
    status
  }
}`;

test.beforeAll(async () => {
  await db.execute(`TRUNCATE TABLE "user" CASCADE;`);
  await db.execute(
    `INSERT INTO "user" (username, "password") VALUES ('username', '$2b$10$ODtiivwpN9t4tepsDlHZPOLVsR8f9RsUNwroAt9Opmj3kG.szQasG');`,
  );
});

test('Should receive error when there is no auth header', async ({ request }) => {
  const req = await request.post('/graphql', {
    data: {
      query,
      variables: {
        input: {
          title: 'Task 1',
          description: 'Some random description',
          status: 'todo',
        },
      },
    },
  });

  const response = await req.json();
  expect(req.ok()).toBeTruthy();
  expect(response.errors[0].message).toBe('Not authenticated.');
});

test('Should create the task', async ({ request }) => {
  const accessToken = await getAccessToken(request);

  const req = await request.post('/graphql', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      query,
      variables: {
        input: {
          title: 'Task 1',
          description: 'Some random description',
          status: 'todo',
        },
      },
    },
  });
  expect(req.ok()).toBeTruthy();
  const response = await req.json();
  expect(response.data.createTask.id).toBeTruthy();
  expect(response.data.createTask.title).toBe('Task 1');
  expect(response.data.createTask.description).toBe('Some random description');
  expect(response.data.createTask.status).toBe('todo');
});
