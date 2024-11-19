import React from "react";
import TodoItem from "./TodoItem";
import { Table } from "react-bootstrap";

function TodoList({ todos, onToggleComplete, onDelete, onUpdate, onComplete }) {
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
            key={index}
            todo={todo}
            onToggleComplete={() => onToggleComplete(index)}
            onDelete={() => onDelete(index)}
            onUpdate={(newText) => onUpdate(index, newText)}
            onComplete={() => onComplete(index)}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default TodoList;
