import { Todo } from "../model";

type Actions = {
  type: string;
  payload: any;
}

export const DoneTodoReducer = (state: Todo[], action: Actions): Todo[] => {
  
  const { type } = action;

  if (type === "ADD_DONE_TODO") {
    const { payload: todo } = action;

    if (!todo.length) return state;

    const newTodo: Todo = {
      id: Date.now(),
      todo,
      isDone: true,
    };

    const newState: Todo[] = [...state, newTodo];

    return newState;

  } else if (type === "REMOVE_DONE_TODO") {
    
    const { payload: isdfdd } = action;

    const newTodos = state.filter((oldTodo) => oldTodo.id !== isdfdd);

    return newTodos;

  } else if (type === "EDIT_DONE_TODO") {

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