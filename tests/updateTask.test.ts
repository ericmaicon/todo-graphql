import { db } from '@/db';
import { test, expect } from '@playwright/test';
import { getAccessToken } from './utils';
import { taskTable } from '@/db/schema';

const query = `
mutation($updateTaskId: ID!, $input: UpdateTaskDAO!) {
  updateTask(id: $updateTaskId, input: $input) {
    id
    title
    description
    status
  }
}`;

test.beforeAll(async () => {
  await db.execute(`TRUNCATE TABLE "task" CASCADE;`);
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
        updateTaskId: 1,
        input: {
          status: 'todo',
        },
      },
    },
  });

  const response = await req.json();
  expect(req.ok()).toBeTruthy();
  expect(response.errors[0].message).toBe('Not authenticated.');
});

test('Should update an existing task', async ({ request }) => {
  const accessToken = await getAccessToken(request);
  const [task] = await db.insert(taskTable).values({ title: 'Task 1', status: 'todo' }).returning();

  const req = await request.post('/graphql', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      query,
      variables: {
        updateTaskId: task.id,
        input: {
          status: 'inProgress',
        },
      },
    },
  });
  expect(req.ok()).toBeTruthy();
  const response = await req.json();
  expect(response.data.updateTask.id).toBeTruthy();
  expect(response.data.updateTask.title).toBe('Task 1');
  expect(response.data.updateTask.status).toBe('inProgress');
});
