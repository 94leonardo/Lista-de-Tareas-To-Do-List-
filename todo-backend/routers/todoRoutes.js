//Rutas de la API


const express = require("express");
const router = express.Router();

const {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");

router.get("/", getTodos);
router.post("/", createTodo);
router.delete("/delete/:id", deleteTodo);
router.put("/actualizar/:id", updateTodo);

module.exports = router;
