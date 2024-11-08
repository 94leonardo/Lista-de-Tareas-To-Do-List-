import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function TodoInput({ onAddTodo }) {
  const [input, setInput] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    if (input.trim()) {
      onAddTodo(input); // Llamar a la función para agregar la tarea
      setInput(""); // Limpiar el input después de agregar la tarea
    }
  };

  return (
    <Form onSubmit={handleAddTodo} className="d-flex mb-3">
      <Form.Control
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escriba una tarea..."
      />
      <Button type="submit" variant="primary" className="ms-2">
        Añadir Tarea
      </Button>
    </Form>
  );
}

export default TodoInput;
