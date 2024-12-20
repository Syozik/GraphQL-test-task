import { gql } from "apollo-server";

// Queries:
// ​ tasks: Fetch all tasks (supports optional filtering by completed and
// dueDate range).
// ​ task(id: ID!): Fetch a single task by ID.
// Mutations:
// ​ createTask(input: TaskInput!): Create a new task.
// ​ updateTask(id: ID!, input: TaskInput!): Update an existing task.
// ​ deleteTask(id: ID!): Delete a task by ID.

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    dueDate: String!
  }

  type Query {
    tasks(
      completed: Boolean
      dueRangeStart: String
      dueRangeEnd: String
    ): [Task]!
    task(id: ID!): Task
  }
  input TaskInput {
    title: String!
    description: String
    completed: Boolean!
    dueDate: String!
  }

  type Mutation {
    createTask(input: TaskInput!): Task
    updateTask(id: ID!, input: TaskInput!): Task
    deleteTask(id: ID!): Boolean
    markAllTasksCompleted: [Task]
  }
`;
