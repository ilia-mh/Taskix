import React, { useContext } from "react";
import SingleTodo from "./singleTodo";

import { Store } from "../store/Store";
import { Todo } from "../model";

const TodoList: React.FC = () => {
  const { todos } = useContext(Store);

  const getTodos: (isDone: boolean) => Todo[] = (isDone: boolean) =>
    todos.filter((todo) => todo.isDone == isDone);

  return (
    <div className="container">

      <div className="todos">

        <span className="todos__heading">Active Tasks</span>

        {
          getTodos(false).map( todo => <SingleTodo todo={todo} /> )
        }

      </div>

      <div className="todos remove">
        <span className="todos__heading">Completed Tasks</span>

        {
          getTodos(true).map( todo => <SingleTodo todo={todo} /> )
        }
      </div>

    </div>
  );
};

export default TodoList;
