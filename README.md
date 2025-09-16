# TODO GraphQL server

## Prerequisites

- Node.js
- npm
- Docker

## Local development installation

Clone the repo and install the dependencies:

```sh
npm install
```

Setup the .env file as below if you will going to use the docker-compose file from the repo:

```sh
DATABASE_URL=postgresql://user:pass@127.0.0.1:5432/todo
ACCESS_KEY=access
REFRESH_KEY=refresh
```

Start the docker containers to run a postgres locally:

```sh
docker compose up -d
```

Run the migrations to create the tables:

```sh
npx drizzle-kit push
```

Run the server with the following command:

```sh
npm run dev
```

## Tests

Run lint:

```sh
npm run lint
```

Run tests:

```sh
npm run test
```

In order to run the integration test, you need to start the test server:

```sh
npm run dev:test
```

Then you can run the integration tests:

```sh
npm run test:integration
```

## Docker

To run the application using Docker:

```sh
docker build  --platform linux/amd64  -t todo-api .
docker run -p 4000:4000 todo-api
```

## Queries implemented:

You might need to create the user in the database in order to test it below:

Sign In:

```sh
curl --location 'http://localhost:4000/graphql' \
--header 'Content-Type: application/json' \
--data '{"query":"mutation signIn($input: SignInDAO!) {\n  signIn(input: $input) {\n    accessToken\n  }\n}","variables":{"input":{"username":"username","password":"password"}}}'
```

Create Task:

```sh
curl --location 'http://localhost:4000/graphql' \
--header 'Authorization: Bearer ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{"query":"mutation($input: CreateTaskDAO!) {\n  createTask(input: $input) {\n    id\n    title\n    description\n    status\n  }\n}","variables":{"input":{"title":"Task 1","description":"Some random description","status":"todo"}}}'
```

Update Task:

```sh
curl --location 'http://localhost:4000/graphql' \
--header 'Authorization: Bearer ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{"query":"mutation($updateTaskId: ID!, $input: UpdateTaskDAO!) {\n  updateTask(id: $updateTaskId, input: $input) {\n    id\n    title\n    description\n    status\n  }\n}","variables":{"updateTaskId":1,"input":{"status":"inProgress"}}}'
```

List of Tasks:

```sh
curl --location 'http://localhost:4000/graphql' \
--header 'Authorization: Bearer ACCESS_TOKEN' \
--header 'Content-Type: application/json' \
--data '{"query":"query {\n  tasks {\n    totalCount\n    items {\n      id\n      title\n      description\n      status\n    }\n  }\n}","variables":{}}'
```
