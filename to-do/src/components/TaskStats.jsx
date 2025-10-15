function TaskStats({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <>
      <div className="stat-card total">
        <h4>Total de Tareas</h4>
        <span>{total}</span>
      </div>
      <div className="stat-card completed">
        <h4>Tareas Completadas</h4>
        <span>{completed}</span>
      </div>
      <div className="stat-card pending">
        <h4>Tareas Pendientes</h4>
        <span>{pending}</span>
      </div>
    </>
  );
}
export default TaskStats;
