import { db } from '@/db';
import { test, expect } from '@playwright/test';

const query = `
mutation signIn($input: SignInDAO!) {
  signIn(input: $input) {
    accessToken
  }
}`;

test.beforeAll(async () => {
  await db.execute(`TRUNCATE TABLE "user" CASCADE;`);
  await db.execute(
    `INSERT INTO "user" (username, "password") VALUES ('username', '$2b$10$ODtiivwpN9t4tepsDlHZPOLVsR8f9RsUNwroAt9Opmj3kG.szQasG');`,
  );
});

test('Should receive error when user does not exist', async ({ request }) => {
  const req = await request.post('/graphql', {
    data: {
      query,
      variables: {
        input: {
          username: 'username2',
          password: 'password',
        },
      },
    },
  });

  const response = await req.json();
  expect(req.ok()).toBeTruthy();
  expect(response.errors[0].message).toBe('User not found.');
});

test('Should receive error when username and password is invalid', async ({ request }) => {
  const req = await request.post('/graphql', {
    data: {
      query,
      variables: {
        input: {
          username: 'username',
          password: 'password2',
        },
      },
    },
  });

  const response = await req.json();
  expect(req.ok()).toBeTruthy();
  expect(response.errors[0].message).toBe('Invalid Credentials.');
});

test('Should return the access token', async ({ request }) => {
  const req = await request.post('/graphql', {
    data: {
      query,
      variables: {
        input: {
          username: 'username',
          password: 'password',
        },
      },
    },
  });

  const response = await req.json();
  expect(req.ok()).toBeTruthy();
  expect(response.errors).toBeUndefined();
  expect(response.data.signIn.accessToken).toBeTruthy();
});
