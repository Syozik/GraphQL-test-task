import { ApolloError } from "apollo-server";
import { Task } from "../types/task";

export default function validateInput(input: Partial<Task>): ApolloError | null {
  if (!input.title || input.title.length > 100) {
    return new ApolloError(
      "Title is required and must be less than 100 characters"
    );
  }

  if (input.description && input.description.length > 500) {
    return new ApolloError("Description can't be more than 500 characters");
  }

  if (!input.dueDate || isNaN(new Date(input.dueDate).getTime())) {
    return new ApolloError(
      "Due date is required and must be in the ISO format date"
    );
  }
  return null;

}
