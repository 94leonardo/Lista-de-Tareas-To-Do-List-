import React, { useState } from "react";
import { Form, Button, FormControl, InputGroup } from "react-bootstrap";

function TodoInput({ onAddTodo }) {
  const [input, setInput] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    // Validar que el texto y la fecha no estén vacíos
    if (text.trim() && date) {
      // Llamar a la función para agregar la tarea con texto y fecha
      onAddTodo(text, date);
      setText(""); // Limpiar el campo de texto
      setDate(""); // Limpiar el campo de fecha
    }
  };

  return (
    <Form onSubmit={handleAddTodo} className="d-flex mb-3">
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escriba una tarea..."
        />
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-label="Seleccionar fecha"
          className="ms-2"
        />
        <Button type="submit" variant="primary" className="ms-2">
          Añadir Tarea
        </Button>
      </InputGroup>
    </Form>
  );
}

export default TodoInput;
