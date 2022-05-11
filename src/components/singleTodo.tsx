import React, { useState, useRef, useEffect, useContext } from "react";
import { Todo } from "./../model";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Store } from "../store/Store";

interface Props {
  todo: Todo;
}

const SingleTodo: React.FC<Props> = ({ todo }) => {

  const [editMode, setEditMode] = useState<boolean>(false);
  const [edittedTodo, setEdittedTodo] = useState<string>("");

  const { editTodo, removeTodo, toggleIsDone } = useContext(Store)

  const editInput = useRef<HTMLInputElement>(null)

  const hanldeEdit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if( !edittedTodo.length ) return

    console.log(todo.id)
    console.log(edittedTodo)
    
    editTodo( todo.id, edittedTodo )
    // const newTodos = todos.map((oldTodo) =>
    //   oldTodo.id === todo.id ? { ...oldTodo, todo: edittedTodo } : oldTodo
    // );
    // setTodos(newTodos);

    toggleEditMode()
  };

  const toggleEditMode = () => {
    if ( !editMode && !todo.isDone ) {
      setEditMode(true);
      setEdittedTodo(todo.todo);
    } else if ( editMode ) {
      setEditMode(false);
      setEdittedTodo("");
    }
  };

  const handleDelete: () => void = () => {

    removeTodo(todo.id)
    // const newTodos = todos.filter((oldTodo) => oldTodo.id !== todo.id);
    // setTodos(newTodos);
  };

  const handleDone: () => void = () => {

    toggleIsDone(todo.id)
    // const newTodos = todos.map((oldTodo) =>
    //   oldTodo.id === todo.id ? { ...oldTodo, isDone: !oldTodo.isDone } : oldTodo
    // );
    // setTodos(newTodos);
  };

  useEffect( () => {

    if( editMode ) {
      editInput.current?.focus()
    }

  }, [editMode])

  return (
    <form className="todos__single" onSubmit={ (e) => hanldeEdit(e) }>

      {editMode ? (

        <input
          className="todos__single--text"
          value={edittedTodo}
          onChange={(e) => setEdittedTodo(e.target.value)}
          ref={editInput}
        />
        
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        <span className="icon" onClick={toggleEditMode}>
          <AiFillEdit />
        </span>

        <span className="icon" onClick={handleDelete}>
          <AiFillDelete />
        </span>

        <span className="icon" onClick={handleDone}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;