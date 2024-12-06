// Configuración de la URL base del backend
const API_URL = "http://localhost:5000/api/todos";

// Obtener todas las tareas
export const getTodos = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Error al obtener las tareas");
  }
  return response.json();
};

// Crear una nueva tarea
export const createTodo = async (todo) => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("Error al crear la tarea");
  }
  return response.json();
};

// Actualizar una tarea
export const updateTodo = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/actualizar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData), // Convertir el objeto a JSON
    });

    if (!response.ok) {
      throw new Error("Error al actualizar la tarea");
    }

    return response.json(); // Devolver la respuesta como JSON
  } catch (error) {
    console.error("Error en updateTodo:", error);
    throw error; // Lanza el error para manejarlo donde se llame
  }
};

// Eliminar una tarea
export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la tarea");
    }
    return response.json();
  } catch (error) {
    return error;
  }
};
