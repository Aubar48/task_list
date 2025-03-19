import PropTypes from "prop-types";

const TaskItem = ({
  id,
  title,
  area,
  completed,
  createdAt,
  toggleTaskCompletion,
  deleteTask,
}) => {
  // Si createdAt es un string, lo convertimos a una fecha para mostrarla
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${
          completed ? "tasks__item__toggle--completed" : ""
        }`}
        onClick={() => toggleTaskCompletion(id, !completed)}
      >
        Titulo: {title} / Area: {area} / Creado el: {formattedDate}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => deleteTask(id)}
      >
        x
      </button>
    </li>
  );
};

TaskItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired, // O PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]) si aceptas objetos Date
  toggleTaskCompletion: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskItem;
