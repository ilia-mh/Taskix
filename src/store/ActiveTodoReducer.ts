import { Todo } from "../model";

type Actions = {
  type: string;
  payload: any;
}

export const ActiveTodoReducer = (state: Todo[], action: Actions): Todo[] => {
  
  const { type } = action;

  if (type === "ADD_ACTIVE_TODO") {
    const { payload: todo } = action;

    if (!todo.length) return state;

    const newTodo: Todo = {
      id: Date.now(),
      todo,
      isDone: false,
    };

    const newState: Todo[] = [...state, newTodo];

    return newState;

  } else if (type === "REMOVE_ACTIVE_TODO") {
    
    const { payload: isdfdd } = action;

    const newTodos = state.filter((oldTodo) => oldTodo.id !== isdfdd);

    return newTodos;

  } else if (type === "EDIT_ACTIVE_TODO") {

    const { id, newTodo } = action.payload;

    if( !newTodo.length ) return state

    const newTodos = state.map((oldTodo) =>
      oldTodo.id === id ? { ...oldTodo, todo: newTodo } : oldTodo
    );

    return newTodos;

  } else if (type === "TOGGLE_ISDONE") {
    const { payload: id } = action;

    const newTodos = state.map((oldTodo) =>
      oldTodo.id === id ? { ...oldTodo, isDone: !oldTodo.isDone } : oldTodo
    );

    return newTodos;

  }

  return state;
};