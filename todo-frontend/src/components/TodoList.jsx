import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggleComplete, onDelete, onUpdate }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          onToggleComplete={() => onToggleComplete(index)}
          onDelete={() => onDelete(index)}
          onUpdate={(newText) => onUpdate(index, newText)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
