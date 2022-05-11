import React, { useContext } from 'react'
import SingleTodo from './singleTodo';

import { Store } from "../store/Store";


const TodoList: React.FC = () => {

  const { todos } = useContext(Store)

  return (
    <div className='todos'>
      {
        todos.length ?
          todos.map( todo => 
            <SingleTodo todo={todo} key={todo.id} />
          )
        :
        'No Todos'
      }
    </div>
  )
}

export default TodoList
