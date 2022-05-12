import React, { useContext } from "react";
import SingleTodo from "./singleTodo";

import { Store } from "../store/Store";
import { Todo } from "../model";
import { Droppable } from "react-beautiful-dnd";

const TodoList: React.FC = () => {
  const { activeTodos, doneTodos } = useContext(Store);

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

            {activeTodos.map((todo,idx) => (
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

            {doneTodos.map((todo,idx) => (
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
