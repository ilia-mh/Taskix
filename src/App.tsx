import React, { useState, useContext } from 'react';
import './App.css';

import { DragDropContext, DropResult } from 'react-beautiful-dnd'

import InputField from './components/InputField';
import TodoList from './components/TodoList';

import { Store } from "./store/Store";

const App: React.FC = () => {

  const { addTodo } = useContext(Store)

  const [newTodo,setNewTodo] = useState('')

  const handleAddTodo = (): void => {

    if( !newTodo.length ) return
    
    addTodo(newTodo)

    setNewTodo('')

  }

  const dropDownDragEnd = (result: DropResult) => {
    // Logic for changing the droppable places and switching to done if in drops to Done tasks
  }

  return (
    <DragDropContext onDragEnd={dropDownDragEnd}>

      <div className="App">
        <span className="heading">Taskix</span>

        <InputField todo={newTodo} setTodo={setNewTodo} addTodo={handleAddTodo} />

        <TodoList />

      </div>

    </DragDropContext>
  );
}

export default App;
