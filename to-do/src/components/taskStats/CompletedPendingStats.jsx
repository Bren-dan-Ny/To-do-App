import CountUp from "react-countup";

function CompletedPendingStats({ completed, pending }) {
  return (
    <div className="container-completed-pending">
      <div className="stat-card card-completed">
        <h4>
          Tareas <br /> Completadas
        </h4>
        <CountUp
          end={completed}
          duration={1.2}
          formattingFn={(value) => String(value).padStart(2, "0")}
        />
      </div>

      <div className="stat-card card-pending">
        <h4>
          Tareas <br /> Pendientes
        </h4>
        <CountUp
          end={pending}
          duration={1.2}
          formattingFn={(value) => String(value).padStart(2, "0")}
        />
      </div>
    </div>
  );
}

export default CompletedPendingStats;
