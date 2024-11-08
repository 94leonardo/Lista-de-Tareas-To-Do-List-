import React, { useState } from "react";
import { Button, InputGroup, FormControl, ListGroup } from "react-bootstrap";

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
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      {isEditing ? (
        <InputGroup>
          <FormControl
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <Button variant="success" onClick={handleUpdate}>
            Guardar
          </Button>
        </InputGroup>
      ) : (
        <>
          <span
            onClick={onToggleComplete}
            style={{
              cursor: "pointer",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </span>
          <div>
            <Button variant="outline-primary" size="sm" onClick={handleEdit}>
              Editar
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={onDelete}
              className="ms-2"
            >
              Eliminar
            </Button>
          </div>
        </>
      )}
    </ListGroup.Item>
  );
}

export default TodoItem;
