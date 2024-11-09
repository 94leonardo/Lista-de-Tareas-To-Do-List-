import React from "react";
import { ListGroup } from "react-bootstrap";

function CompletedList({ todos }) {
  return (
    <ListGroup className="completed-list">
      {todos.map((todo, index) => (
        <ListGroup.Item
          key={index}
          style={{ color: "#6c757d" }}
        >
          {todo.text}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default CompletedList;
