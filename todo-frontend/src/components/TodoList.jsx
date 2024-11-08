import React from "react";
import TodoItem from "./TodoItem";
import { ListGroup } from "react-bootstrap";

function TodoList({ todos, onToggleComplete, onDelete, onUpdate }) {
  return (
    <ListGroup>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          onToggleComplete={() => onToggleComplete(index)}
          onDelete={() => onDelete(index)}
          onUpdate={(newText) => onUpdate(index, newText)}
        />
      ))}
    </ListGroup>
  );
}

export default TodoList;
