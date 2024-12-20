import { v4 as uuidv4 } from "uuid";

export default function generateID(): string {
  return uuidv4();
}
