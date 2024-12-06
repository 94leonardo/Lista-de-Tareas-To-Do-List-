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
          <strong>{todo.id || todo._id}.</strong> {todo.text} <em>({todo.dateCompleted})</em>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default CompletedList;
