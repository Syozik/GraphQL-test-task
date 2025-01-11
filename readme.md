# Task Management API

This is a simple Task Management API built with TypeScript and Apollo Server. It allows users to create, read, update, and delete tasks, as well as filter tasks based on their completion status and due dates.

## Features

- Create a new task
- Retrieve all tasks with optional filtering by completion status and due date
- Update an existing task
- Delete a task
- Mark all tasks as completed

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/testtask.git
   cd testtask
   ```

### Running the API
To start the server, run:
```bash
npm start
```
The server will be running at `http://localhost:4000`.
### Testing
To run the tests, use the following command:
```bash
npm test
```
### API Endpoints
#### Queries
- **Get all tasks**
  - Query: `tasks(completed: Boolean, dueRangeStart: String, dueRangeEnd: String): [Task]`
- **Get a task by ID**
  - Query: `task(id: ID!): Task`
#### Mutations
- **Create a task**
  - Mutation: `createTask(input: TaskInput!): Task`
- **Update a task**
  - Mutation: `updateTask(id: ID!, input: TaskInput!): Task`
- **Delete a task**
  - Mutation: `deleteTask(id: ID!): Boolean`
- **Mark all tasks as completed**
  - Mutation: `markAllTasksCompleted(): [Task]`
### Task Input Structure
The `TaskInput` type used for creating and updating tasks has the following structure:
```graphql
input TaskInput {
  title: String!
  description: String
  completed: Boolean!
  dueDate: String!
}
```
