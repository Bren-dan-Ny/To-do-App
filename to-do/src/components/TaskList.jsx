import TaskCard from "./TaskCard";

function TaskList({ tasks, onToggleComplete, onDelete, onEdit }) {
  return (
    <ul className="task-list">
      {tasks.length === 0 ? (
        <p>No hay tareas todavía</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </ul>
  );
}

export default TaskList;
