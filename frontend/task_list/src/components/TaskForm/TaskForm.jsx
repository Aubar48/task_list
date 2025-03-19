// TaskForm.jsx
import { useState } from "react";
import PropTypes from "prop-types";

const TaskForm = ({ addTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskArea, setNewTaskArea] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTaskTitle, newTaskArea);
    setNewTaskTitle("");
    setNewTaskArea("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="Ingrese la tarea"
      />
      <input
        type="text"
        value={newTaskArea}
        onChange={(e) => setNewTaskArea(e.target.value)}
        placeholder="Ingrese el area"
      />

      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TaskForm;
