import React, { useState } from "react";

function TodoInput({ onAddTodo }) {
  const [input, setInput] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    if (input.trim()) {
      onAddTodo(input); // Llamar a la función para agregar la tarea
      setInput(""); // Limpiar el input después de agregar la tarea
    }
  };

  return (
    <div>
      <form className="todo-input" onSubmit={handleAddTodo}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escriba una tarea..."
        />
        <button type="submit">
          Añadir Tarea
        </button>
      </form>
    </div>
  );
}

export default TodoInput;
