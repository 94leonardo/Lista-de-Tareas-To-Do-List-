import React from "react";
import { useState } from "react";

function TodoInput({ onAddTodo }) {
  const [input, setInput] = useState("");
  const handleAddTodo = () => {
    if (input.trim()) {
      onAddTodo(input);
      setInput("");
    }
  };
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escriba una tarea"
      />
      <button onClick={handleAddTodo}>Añadir Tarea</button>
    </div>
  );
}

export default TodoInput;
