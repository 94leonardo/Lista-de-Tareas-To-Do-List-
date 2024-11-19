//# Punto de entrada del servidor
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const todoRoutes = require("./routers/todoRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
//conectar a la base de datos

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido al backend de nuestra Lista de Tareas!");
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
