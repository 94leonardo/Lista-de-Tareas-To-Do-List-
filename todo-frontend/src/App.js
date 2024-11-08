import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import { Container, Row, Col } from "react-bootstrap";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]); // Arreglo de tareas
  const [filter, setFilter] = useState("all");

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

  const getFilteredTodos = () => {
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    } else if (filter === "pending") {
      return todos.filter((todo) => !todo.completed);
    }
    return todos;
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={6} className="mx-auto">
          <h1 className="text-center mb-4">Lista de Tareas</h1>
          <div className="mb-4">
            <TodoInput onAddTodo={addTodo} />
            <TodoFilter onFilterChange={setFilter} />
          </div>
          <TodoList
            todos={getFilteredTodos()}
            onToggleComplete={toggleCompleted}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
