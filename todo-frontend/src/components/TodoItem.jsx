import React, { useState } from "react";

function TodoItem({ todo, onToggleComplete, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo?.text || ""); // Manejar caso en el que 'todo' sea indefinido

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (newText.trim()) { // Validar que el nuevo texto no esté vacío
      onUpdate(newText);
      setIsEditing(false);
    }
  };

  // Si 'todo' no está definido, no renderizar el componente
  if (!todo) {
    return null;
  }

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
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
          <button className="edit" onClick={handleEdit}>Editar</button>
          <button className="delete" onClick={onDelete}>Eliminar</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
