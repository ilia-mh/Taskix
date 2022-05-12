import { Todo } from "../model";

export interface ContextValue {
  activeTodos: Todo[];
  doneTodos: Todo[];
  addTodo: ( isDone: boolean, newTodo: string ) => void;
  removeTodo: ( isDone: boolean, id: number ) => void;
  editTodo: ( isDone: boolean, id: number, newTodo: string ) => void;
  toggleIsDone: (todo: Todo) => void;
}

export const initialContextVal = {
  activeTodos: [],
  doneTodos: [],
  addTodo: ( isDone: boolean, newTodo: string ) => {
  },
  removeTodo: ( isDone: boolean, id: number ) => {
  },
  editTodo: ( isDone: boolean, id: number, newTodo: string) => {
  },
  toggleIsDone: (todo: Todo) => {
  },
}