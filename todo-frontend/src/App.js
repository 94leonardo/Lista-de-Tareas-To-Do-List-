import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]); // Arreglo de tareas

  // Cargar las tareas desde localStorage al inicio
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [];
    setTodos(storedTodos);
  }, []);

  // Guardar las tareas en localStorage cuando cambien
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { text, completed: false }]);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleCompleted = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (index, newText) => {
    setTodos(
      todos.map((todo, i) => (i === index ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <div className="App">
      <h1>Lista de Tareas</h1>
      <TodoInput onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onToggleComplete={toggleCompleted}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
      />
    </div>
  );
}

export default App;
