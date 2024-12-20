const { ApolloServer } = require("apollo-server");
const { gql } = require("apollo-server");
const { resolvers } = require("../resolvers/taskResolver");
const { typeDefs } = require("../schema/typeDefs");

const server = new ApolloServer({ typeDefs, resolvers });

const createTaskMutation = gql`
  mutation CreateTask($input: TaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      completed
      dueDate
    }
  }
`;

const getTasksQuery = gql`
  query GetTasks($completed: Boolean) {
    tasks(completed: $completed) {
      id
      title
      completed
    }
  }
`;

const updateTaskMutation = gql`
  mutation UpdateTask($id: ID!, $input: TaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      title
      description
      completed
      dueDate
    }
  }
`;

const deleteTaskMutation = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

const getTaskByIdQuery = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      completed
    }
  }
`;

describe("Task Resolvers", () => {
  let createdTaskId;

  it("Creating a task", async () => {
    const input = {
      title: "Test Task",
      description: "Test task description",
      completed: false,
      dueDate: "2024-12-31",
    };

    const res = await server.executeOperation({
      query: createTaskMutation,
      variables: { input },
    });

    expect(res.errors).toBeUndefined();
    expect(res.data?.createTask).toHaveProperty("id");
    expect(res.data?.createTask.title).toBe(input.title);
    expect(res.data?.createTask.completed).toBe(input.completed);
    expect(res.data?.createTask.dueDate).toBe(input.dueDate);

    createdTaskId = res.data?.createTask.id;
  });

  it("Fetching all tasks", async () => {
    const res = await server.executeOperation({
      query: getTasksQuery,
      variables: { completed: false },
    });

    expect(res.errors).toBeUndefined();
    expect(res.data?.tasks).toBeInstanceOf(Array);
    expect(res.data?.tasks[0]).toHaveProperty("id");
    expect(res.data?.tasks[0]).toHaveProperty("title");
  });

  it("Updating a task", async () => {
    const updateInput = {
      title: "Updated Test Task",
      description: "Updated test task description",
      completed: true,
      dueDate: "2024-12-25",
    };

    const res = await server.executeOperation({
      query: updateTaskMutation,
      variables: {
        id: createdTaskId,
        input: updateInput,
      },
    });

    expect(res.errors).toBeUndefined();
    expect(res.data?.updateTask.id).toBe(createdTaskId);
    expect(res.data?.updateTask.title).toBe(updateInput.title);
    expect(res.data?.updateTask.completed).toBe(updateInput.completed);
    expect(res.data?.updateTask.dueDate).toBe(updateInput.dueDate);
  });

  it("Deleting a task", async () => {
    const res = await server.executeOperation({
      query: deleteTaskMutation,
      variables: { id: createdTaskId },
    });

    expect(res.errors).toBeUndefined();
    expect(res.data?.deleteTask).toBe(true);

    const getRes = await server.executeOperation({
      query: getTasksQuery,
      variables: { completed: true },
    });

    expect(getRes.errors).toBeUndefined();
    expect(
      getRes.data?.tasks.find((task) => task.id === createdTaskId)
    ).toBeUndefined();
  });
});
