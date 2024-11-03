// App.js
import React, { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]); // Arreglo de tareas

  const addTodo = (text) => {
    setTodos([...todos, { text, completed: false }]);
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  const toggleCompleted = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todos, completed: !todos.completed } : todo
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
