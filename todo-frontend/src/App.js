import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import CompletedList from "./components/CompletedList";
import { Container, Row, Col } from "react-bootstrap";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]); //Arreglo de tareas
  const [filter, setFilter] = useState("all");
  const [completedTodos, setCompletedTodos] = useState([]);

  // Cargar las tareas desde localStorage al inicio
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [];
    const storedCompleted =
      JSON.parse(localStorage.getItem("CompleteTodos")) || [];
    setCompletedTodos(storedCompleted);
    setTodos(storedTodos);
  }, []);

  // Guardar las tareas en localStorage cuando cambien
  useEffect(() => {
    if (todos.length > 0 && completedTodos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.setItem("CompletedTodos", JSON.stringify(completedTodos));
    }
  }, [todos, completedTodos]);

  const addTodo = (text) => {
    const newTodo = {
      id: todos.length + 1,
      text,
      completed: false,
      dateCreated: new Date().toLocaleString(), // Fecha de ingreso
      dateCompleted: null, // Inicialmente null
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    // Reenumerar las tareas después de eliminar
    const reIndexedTodos = updatedTodos.map((todo, i) => ({
      ...todo,
      id: i + 1,
    }));
    setTodos(reIndexedTodos);
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

  const completeTodo = (index) => {
    const completedTodo = {
      ...todos[index],
      completed: true,
      dateCompleted: new Date().toLocaleString(), // Fecha de completado
    };
    setCompletedTodos([...completedTodos, completedTodo]);
    setTodos(todos.filter((_, i) => i !== index));
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
            onComplete={completeTodo}
          />
        </Col>
        <h2>Completadas</h2>
        <CompletedList todos={completedTodos} />
      </Row>
    </Container>
  );
}

export default App;
