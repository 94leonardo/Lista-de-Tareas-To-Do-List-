import React, { useState } from "react";

function TodoItem({ todo, onToggleComplete, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleUpdate = () => {
    onUpdate(newText);
    setIsEditing(false);
  };
  return (
    <li style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleUpdate}>Actualizar</button>
        </>
      ) : (
        <>
          <span onClick={onToggleComplete} style={{ cursor: "pointer" }}>
            {todo.text}
          </span>
          <button onClick={handleEdit}>Editar</button>
          <button onClick={onDelete}>Eliminar</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
