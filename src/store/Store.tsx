import React, { useReducer } from "react";
import { ContextValue, initialContextVal } from "./ContextInitial";
import { TodoReducer } from "./TodoReducer";


const actions = {
  ADD_TODO: "ADD_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  TOGGLE_ISDONE: "TOGGLE_ISDONE",
  EDIT_TODO: "EDIT_TODO",
};


export const Store = React.createContext<ContextValue>(initialContextVal);

interface Props {
  children: React.ReactNode;
}

const AppContext: React.FC<Props> = ({ children }) => {
  const [TodoState, TodoDispatch] = useReducer(TodoReducer, []);

  const value: ContextValue = {
    todos: TodoState,
    addTodo: (newTodo) => {
      TodoDispatch({ type: actions.ADD_TODO, payload: newTodo });
    },
    removeTodo: (id) => {
      TodoDispatch({ type: actions.REMOVE_TODO, payload: id });
    },
    toggleIsDone: (id) => {
      TodoDispatch({ type: actions.TOGGLE_ISDONE, payload: id });
    },
    editTodo: (id, newTodo) => {
      TodoDispatch({ type: actions.EDIT_TODO, payload: { id, newTodo } });
    },
  };

  return <Store.Provider value={value}>{children}</Store.Provider>;
};

export default AppContext;
