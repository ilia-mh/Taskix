import React, { useContext } from "react";
import SingleTodo from "./singleTodo";

import { Store } from "../store/Store";
import { Todo } from "../model";
import { Droppable } from "react-beautiful-dnd";

const TodoList: React.FC = () => {
  const { todos } = useContext(Store);

  const getTodos: (isDone: boolean) => Todo[] = (isDone: boolean) =>
    todos.filter((todo) => todo.isDone == isDone);

  return (
    <div className="container">
      <Droppable droppableId="ActiveTasks">
        {(provided) => (
          <div
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>

            {getTodos(false).map((todo,idx) => (
              <SingleTodo todo={todo} key={todo.id} index={idx} />
            ))}
            {
              provided.placeholder
            }
          </div>
        )}
      </Droppable>

      <Droppable droppableId="DoneTasks">
        {(provided) => (
          <div
            className="todos remove"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>

            {getTodos(true).map((todo,idx) => (
              <SingleTodo todo={todo} key={todo.id} index={idx} />
            ))}
            {
              provided.placeholder
            }
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
