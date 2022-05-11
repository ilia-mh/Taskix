import React, { useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void
}

const InputField: React.FC<Props> = ({ todo, setTodo, addTodo }) => {

  const todoInput = useRef<HTMLInputElement>(null)

  const onSubmit = ( e: React.FormEvent<HTMLFormElement> ): void => {
    e.preventDefault()
    addTodo()
    todoInput.current?.blur()
  }

  return (
    <form className="input" onSubmit={onSubmit}  >

      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        type="input"
        placeholder="Enter a task"
        className="input__box"
        ref={todoInput}
      />

      <button type="submit" className="input_submit">
        Go
      </button>

    </form>
  );
};

export default InputField;
