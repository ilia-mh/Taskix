import React, { useState, useRef, useEffect, useContext } from "react";
import { Todo } from "./../model";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Store } from "../store/Store";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  index: number;
}

const SingleTodo: React.FC<Props> = ({ todo, index }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [edittedTodo, setEdittedTodo] = useState<string>("");

  const { editTodo, removeTodo, toggleIsDone } = useContext(Store);

  const editInput = useRef<HTMLInputElement>(null);

  const hanldeEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!edittedTodo.length) return;

    editTodo(todo.id, edittedTodo);

    toggleEditMode();
  };

  const toggleEditMode = () => {
    if (!editMode && !todo.isDone) {
      setEditMode(true);
      setEdittedTodo(todo.todo);
    } else if (editMode) {
      setEditMode(false);
      setEdittedTodo("");
    }
  };

  const handleDelete: () => void = () => {
    removeTodo(todo.id);
  };

  const handleDone: () => void = () => {
    toggleIsDone(todo.id);
  };

  useEffect(() => {
    if (editMode) {
      editInput.current?.focus();
    }
  }, [editMode]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos__single"
          onSubmit={(e) => hanldeEdit(e)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
      )}
    </Draggable>
  );
};

export default SingleTodo;
