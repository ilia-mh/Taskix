import React, { useState, useContext } from 'react';
import './App.css';

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

  return (
    <div className="App">
      <span className="heading">Taskix</span>

      <InputField todo={newTodo} setTodo={setNewTodo} addTodo={handleAddTodo} />

      <TodoList />

    </div>
  );
}

export default App;
