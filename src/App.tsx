import React, { useState, useContext } from "react";
import "./App.css";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import InputField from "./components/InputField";
import TodoList from "./components/TodoList";

import { Store } from "./store/Store";

const App: React.FC = () => {

  const { activeTodos, doneTodos, addTodo, toggleIsDone } = useContext(Store);

  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (): void => {
    if (!newTodo.length) return;

    addTodo(false,newTodo);

    setNewTodo("");
  };

  const dropDownDragEnd = (result: DropResult) => {
    // Logic for changing the droppable places and switching to done if in drops to Done tasks

    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
      
    let add,
      active = activeTodos,
      complete = doneTodos

    if( source.droppableId === 'ActiveTasks' ) {

      add = active[source.index]

      if( destination.droppableId === 'DoneTasks') {
        toggleIsDone(active[source.index])
      }
    } else {

      add = complete[source.index]

      if( destination.droppableId === 'ActiveTasks') {
        toggleIsDone(complete[source.index])
      }
    }
  };

  return (
    <DragDropContext onDragEnd={dropDownDragEnd}>
      <div className="App">
        <span className="heading">Taskix</span>

        <InputField
          todo={newTodo}
          setTodo={setNewTodo}
          addTodo={handleAddTodo}
        />

        <TodoList />
      </div>
    </DragDropContext>
  );
};

export default App;
