import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";

function TodoFilter({ currentFilter, onFilterChange }) {
    return (
        <ButtonGroup className="mb-3">
            <Button
                variant={currentFilter === "all" ? "primary" : "outline-primary"}
                onClick={() => onFilterChange("all")}
            >
                Todos
            </Button>
            <Button
                variant={currentFilter === "completed" ? "success" : "outline-success"}
                onClick={() => onFilterChange("completed")}
            >
                Completadas
            </Button>
            <Button
                variant={currentFilter === "pending" ? "warning" : "outline-warning"}
                onClick={() => onFilterChange("pending")}
            >
                Pendientes
            </Button>
        </ButtonGroup>
    );
}

export default TodoFilter;
