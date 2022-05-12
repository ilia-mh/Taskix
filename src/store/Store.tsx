import React, { useReducer } from "react";
import { ContextValue, initialContextVal } from "./ContextInitial";
import { ActiveTodoReducer } from "./ActiveTodoReducer";
import { DoneTodoReducer } from "./DoneTodoReducer";

const actions = {
  ADD_ACTIVE_TODO: "ADD_ACTIVE_TODO",
  ADD_DONE_TODO: "ADD_DONE_TODO",
  REMOVE_ACTIVE_TODO: "REMOVE_ACTIVE_TODO",
  REMOVE_DONE_TODO: "REMOVE_DONE_TODO",
  TOGGLE_ISDONE: "TOGGLE_ISDONE",
  EDIT_ACTIVE_TODO: "EDIT_ACTIVE_TODO",
  EDIT_DONE_TODO: "EDIT_DONE_TODO",
  CHANGE_TODO_PLACE: "CHANGE_TODO_PLACE"
};

export const Store = React.createContext<ContextValue>(initialContextVal);

interface Props {
  children: React.ReactNode;
}

const AppContext: React.FC<Props> = ({ children }) => {
  const [ActiveTodos, ActiveTodoDispatch] = useReducer(ActiveTodoReducer, []);
  const [DoneTodos, DoneTodoDispatch] = useReducer(DoneTodoReducer, []);

  const value: ContextValue = {
    activeTodos: ActiveTodos,
    doneTodos: DoneTodos,
    addTodo: ( isDone, newTodo) => {
      if( isDone ) DoneTodoDispatch({ type: actions.ADD_DONE_TODO, payload: newTodo });
      else ActiveTodoDispatch({ type: actions.ADD_ACTIVE_TODO, payload: newTodo });
    },
    removeTodo: (isDone, id) => {
      if( isDone ) DoneTodoDispatch({ type: actions.REMOVE_DONE_TODO, payload: id });
      else ActiveTodoDispatch({ type: actions.REMOVE_ACTIVE_TODO, payload: id });
    },
    editTodo: (isDone, id, newTodo) => {
      if( isDone ) DoneTodoDispatch({ type: actions.EDIT_DONE_TODO, payload: { id, newTodo } });
      else ActiveTodoDispatch({ type: actions.EDIT_ACTIVE_TODO, payload: { id, newTodo } });
    },
    toggleIsDone: (todo) => {

      const { id, todo: note, isDone } = todo

      if( isDone ) {
        DoneTodoDispatch({ type: actions.REMOVE_DONE_TODO, payload: id });
        ActiveTodoDispatch({ type: actions.ADD_ACTIVE_TODO, payload: note });
      } else {
        ActiveTodoDispatch({ type: actions.REMOVE_ACTIVE_TODO, payload: id });
        DoneTodoDispatch({ type: actions.ADD_DONE_TODO, payload: note });
      }

    }, 
    changeTodoPlace: ( isDone: boolean, oldIdx: number, newIdx: number ) => {
      if( isDone ) DoneTodoDispatch({ type: actions.CHANGE_TODO_PLACE, payload: { oldIdx, newIdx } });
      else ActiveTodoDispatch({ type: actions.CHANGE_TODO_PLACE, payload: { oldIdx, newIdx } });
    }
    
  };

  return <Store.Provider value={value}>{children}</Store.Provider>;
};

export default AppContext;
