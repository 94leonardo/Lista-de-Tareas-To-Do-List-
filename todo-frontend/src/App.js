import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import CompletedList from "./components/CompletedList";
import { Container, Row, Col } from "react-bootstrap";
import {
  getTodos,
  createTodo,
  deleteTodo as deleteTodoAPI,
  updateTodo as updateTodoAPI,
} from "./api/todos";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]); // Arreglo de tareas
  const [filter, setFilter] = useState("all");
  const [completedTodos, setCompletedTodos] = useState([]);

  // Cargar las tareas desde el backend al inicio
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getTodos(); // Obtener tareas desde el backend
        setTodos(todos);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (text, date) => {
    try {
      const newTodo = await createTodo({ text, date }); // Crear tarea en el backend
      setTodos([...todos, newTodo]); // Actualizar estado con la nueva tarea
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteTodoAPI(id); // Eliminar tarea en el backend
      //setTodos(todos.filter((todo) => todo.id !== id)); // Actualizar estado
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== id && todo._id !== id)
      ); // Actualiza el estado
      console.log(todos);
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const updateTodo = async (id, newText) => {
    try {
      const updatedTodo = await updateTodoAPI(id, { text: newText }); // Actualizar en backend
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id || todo._id === id ? { ...todo, ...updatedTodo } : todo
        )
      ); // Actualizar estado
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      alert(
        "No se pudo actualizar la tarea. Revisa la consola para más detalles."
      );
    }
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
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

  const handleComplete = async (id) => {
    try {
      const completedTodo = await updateTodoAPI(id, { completed: true });
      setTodos((prevTodos) =>
        prevTodos.filter((todo) =>
          todo.id !== id && todo._id !== id
            ? { ...todo, completed: true }
            : todo
        )
      );
      setCompletedTodos((prevCompleted) => [...prevCompleted, completedTodo]);
    } catch (error) {
      console.error("Error al completar la tarea:", error);
    }
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
            updateTodo={updateTodo} // Pasar la función desde App.js
            onComplete={handleComplete} // Pasa la función aquí
          />
        </Col>
        <h2>Completadas</h2>
        <CompletedList todos={completedTodos} />
      </Row>
    </Container>
  );
}

export default App;
