// Lógica de las tareas
const Todo = require("../models/Todo");

// Obtener todas las tareas
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

// Crear una nueva tarea
exports.createTodo = async (req, res) => {
  const { text, date } = req.body;

  if (!text || !date) {
    return res
      .status(400)
      .json({ error: "El texto y la fecha son requeridos" });
  }

  try {
    const newTodo = new Todo({ text, date });
    await newTodo.save();
    res.status(201).json(newTodo); // 201: Recurso creado
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};

// Actualizar una tarea
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, date, completed } = req.body; // Extrae text y date del cuerpo

  // Validar la presencia del ID y al menos un campo para actualizar
  if (!id || (!text && !date)) {
    return res
      .status(400)
      .json({ error: "ID y al menos un campo (texto o fecha) son requeridos" });
  }

  // Crear dinámicamente el objeto de actualización
  const updateFields = {};
  if (text) updateFields.text = text;
  if (date) updateFields.date = date;
  if (completed) updateFields.completed = completed;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
};

// Eliminar una tarea
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  console.log("Id residido es : ", id);

  if (!id) {
    return res.status(400).json({ error: "El ID es requerido" });
  }

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};
