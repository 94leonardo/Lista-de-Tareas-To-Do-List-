import React from "react";
import TodoItem from "./TodoItem";
import { Table } from "react-bootstrap";

function TodoList({ todos, onToggleComplete, onDelete, updateTodo,  onComplete }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Tarea</th>
          <th>Fecha de Ingreso</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => (
          <TodoItem
            key={index} // Usar el id único como clave
            todo={todo}
            number={index+1}
            onToggleComplete={() => onToggleComplete(todo.id || todo._id)} // Pasar solo el id
            onDelete={() => onDelete(todo.id || todo._id)} // Pasar solo el id
            updateTodo={updateTodo} // Aquí pasamos la función updateTodo // Asegurar que updateTodo reciba id y texto
            onComplete={() => onComplete(todo.id || todo._id)} // Usar id para completar
          />
        ))}
      </tbody>
    </Table>
  );
}

export default TodoList;
