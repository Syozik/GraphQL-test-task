import { ApolloError } from "apollo-server";
import validateInput from "../services/validateInput";
import generateID from "../services/generateIDs";
import { Task } from "../types/task";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "../schema/typeDefs";

// In-memory store for task storage as asked
let tasks: Task[] = [];

// get tasks by completed and dueDate (both optional)
function getTasks(
  completed?: boolean,
  dueRangeStart?: string,
  dueRangeEnd?: string
): Task[] {
  return tasks.filter((task) => {
    if (completed !== undefined) {
      if (task.completed != completed) {
        return false;
      }
    }

    const taskDueDate: Date = new Date(task.dueDate);

    if (dueRangeStart !== undefined) {
      if (taskDueDate.getTime() < new Date(dueRangeStart).getTime()) {
        return false;
      }
    }

    if (dueRangeEnd !== undefined) {
      if (taskDueDate.getTime() > new Date(dueRangeEnd).getTime()) {
        return false;
      }
    }

    return true;
  });
}

function getTaskById(id: string): Task | undefined {
  return tasks.find((task) => task.id === id);
}

function createTask(
  input: Omit<Task, "id"> & Partial<Pick<Task, "completed">>
): Task {
  const validatedInputError = validateInput(input);
  if (validatedInputError) throw validatedInputError;

  const newTask: Task = {
    id: generateID(),
    title: input.title,
    description: input.description,
    completed: input.completed || false,
    dueDate: input.dueDate,
  };

  tasks.push(newTask);
  return newTask;
}

function updateTask(id: string, input: Partial<Task>): Task {
  const task = getTaskById(id);
  if (!task) throw new ApolloError("Task not found");

  const validatedInputError = validateInput(input);
  if (validatedInputError) throw validatedInputError;

  task.title = input.title || task.title;
  task.description = input.description || task.description;
  task.dueDate = input.dueDate || task.dueDate;
  task.completed = input.completed || task.completed;

  return task;
}

function deleteTask(id: string): boolean {
  const task = getTaskById(id);
  if (!task) throw new ApolloError("Task not found");

  tasks = tasks.filter((task) => task.id !== id);
  return true;
}

function markAllTasksCompleted(): Task[] {
  tasks.forEach((task) => {
    task.completed = true;
  });
  return tasks;
}

export const resolvers = {
  Query: {
    tasks: (
      _: any,
      {
        completed,
        dueRangeStart,
        dueRangeEnd,
      }: { completed?: boolean; dueRangeStart?: string; dueRangeEnd?: string }
    ) => getTasks(completed, dueRangeStart, dueRangeEnd),
    task: (_: any, { id }: { id: string }) => getTaskById(id),
  },
  Mutation: {
    createTask: (
      _: any,
      { input }: { input: Omit<Task, "id"> & Partial<Pick<Task, "completed">> }
    ) => createTask(input),
    updateTask: (_: any, { id, input }: { id: string; input: Partial<Task> }) =>
      updateTask(id, input),
    deleteTask: (_: any, { id }: { id: string }) => deleteTask(id),
    markAllTasksCompleted: () => markAllTasksCompleted(),
  },
};
