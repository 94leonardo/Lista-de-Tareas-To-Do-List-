import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

function TodoItem({ todo, number, onToggleComplete, onDelete, updateTodo, onComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo?.text || ""); // Manejar caso en el que 'todo' sea indefinido
  const [isComplete, setIsComplete] = useState(todo?.completed || false);

  const handleEdit = () => {
    setIsEditing(true);
  };


  const handleUpdate = () => {
    console.log("updateTodo:", updateTodo); // Verifica si updateTodo está definida
    if (newText.trim() && updateTodo) {
      updateTodo(todo.id || todo._id, newText); // Llamar a la función de actualización
      setIsEditing(false); // Salir del modo de edición
    } else {
      console.error("updateTodo no está definido o el texto está vacío");
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete(); // Llamada a la función pasada como prop
      setIsComplete(!isComplete); // Cambiar el estado local
    }
  };

  // Si 'todo' no está definido, no renderizar el componente
  if (!todo) {
    return null;
  }

  return (
    <tr>
      <td>
        <td><strong>{number}.</strong></td> {/* Mostrar número secuencial */}
      </td>
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
