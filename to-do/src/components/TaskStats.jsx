function TaskStats({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <>
      <section className="container-stats-card">
        <div className="container-stats-completed-pending">
          <div className="stat-card card-completed">
            <h4>
              Tareas <br /> Completadas
            </h4>
            <span>{completed}</span>
          </div>
          <div className="stat-card card-pending">
            <h4>
              Tareas <br /> Pendientes
            </h4>
            <span>{pending}</span>
          </div>
        </div>
        <div className="stat-card card-total">
          <h4>Total de Tareas</h4>
          <span>{total}</span>
        </div>
      </section>
    </>
  );
}
export default TaskStats;
