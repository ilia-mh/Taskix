import { Todo } from "../model";

export interface ContextValue {
  todos: Todo[];
  addTodo: (newTodo: string) => void;
  removeTodo: (id: number) => void;
  toggleIsDone: (id: number) => void;
  editTodo: (id: number, newTodo: string) => void;
}

export const initialContextVal = {
  todos: [],
  addTodo: (newTodo: string) => {
  },
  removeTodo: (id: number) => {
  },
  toggleIsDone: (id: number) => {
  },
  editTodo: (id: number, newTodo: string) => {
  },
}