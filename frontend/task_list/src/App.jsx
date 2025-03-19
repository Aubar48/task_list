// App.jsx
import { useState, useEffect } from "react";
import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Obtener tareas desde la API
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Agregar una nueva tarea
  const addTask = async (title, area) => {
    try {
      const newTask = { title, area, completed: false };
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Eliminar una tarea
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Actualizar estado de una tarea
  const toggleTaskCompletion = async (id, completed) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, completed } : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Nahuel - Task List</h1>
      </header>
      <main>
        <TaskForm addTask={addTask} />
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTaskCompletion={toggleTaskCompletion}
        />
      </main>
    </div>
  );
};

export default App;
