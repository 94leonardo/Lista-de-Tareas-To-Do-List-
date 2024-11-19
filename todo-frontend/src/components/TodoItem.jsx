import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

function TodoItem({ todo, onToggleComplete, onDelete, onUpdate, onComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo?.text || ""); // Manejar caso en el que 'todo' sea indefinido
  const [isComplete, setIsComplete] = useState(todo?.completed || false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (newText.trim()) {
      // Validar que el nuevo texto no esté vacío
      onUpdate(newText);
      setIsEditing(false);
    }
  };
  const handleComplete = () => {
    if (onComplete) {
      onComplete(); //llamar a la funcion On Complete
      setIsComplete(!isComplete);
    }
  };

  // Si 'todo' no está definido, no renderizar el componente
  if (!todo) {
    return null;
  }

  return (
    <tr>
      <td><strong>{todo.id}.</strong></td>
      <td>
        {isEditing ? (
          <InputGroup>
            <FormControl
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              aria-label="Edit task input"
            />
            <Button variant="success" onClick={handleUpdate} aria-label="Save task">
              Guardar
            </Button>
          </InputGroup>
        ) : (
          <span onClick={onToggleComplete} style={{ cursor: "pointer" }}>
            {todo.text}
          </span>
        )}
      </td>
      
      <td>{todo.date}</td>
     
      <td>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={handleEdit}
          aria-label="Edit task"
        >
          Editar
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={onDelete}
          className="ms-2"
          aria-label="Delete task"
        >
          Eliminar
        </Button>
        <Button
          variant="outline-success"
          size="sm"
          onClick={handleComplete}
          className="ms-2"
          aria-label="Complete task"
        >
          Completado
        </Button>
      </td>
    </tr>
  );
}

export default TodoItem;
