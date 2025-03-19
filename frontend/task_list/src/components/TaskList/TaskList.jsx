// TaskList.jsx
import PropTypes from "prop-types";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = ({ tasks, deleteTask, toggleTaskCompletion }) => {
  return (
    <ul className="tasks__list no-bullet">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          area={task.area}
          completed={task.completed}
          createdAt={task.createdAt}
          deleteTask={deleteTask}
          toggleTaskCompletion={toggleTaskCompletion}
        />
      ))}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  deleteTask: PropTypes.func.isRequired,
  toggleTaskCompletion: PropTypes.func.isRequired,
};

export default TaskList;
