import React, { useState, useContext } from "react";
import "./App.css";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import InputField from "./components/InputField";
import TodoList from "./components/TodoList";

import { Store } from "./store/Store";

const App: React.FC = () => {

  const { activeTodos, doneTodos, addTodo, toggleIsDone, changeTodoPlace } = useContext(Store);

  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (): void => {
    if (!newTodo.length) return;

    addTodo(false,newTodo);

    setNewTodo("");
  };

  const dropDownDragEnd = (result: DropResult) => {
    // Logic for changing the droppable places and switching to done if in drops to Done tasks

    const { source, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
      
    let active = activeTodos,
      complete = doneTodos

    if( source.droppableId === 'ActiveTasks' ) {

      if( destination.droppableId === 'DoneTasks') {
        toggleIsDone(active[source.index])
        changeTodoPlace(true, complete.length, destination.index)
      } else changeTodoPlace(false, source.index, destination.index)
    
    } else {

      if( destination.droppableId === 'ActiveTasks') {
        toggleIsDone(complete[source.index])
        changeTodoPlace(false, active.length, destination.index)
      } else changeTodoPlace(true, source.index, destination.index)

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
