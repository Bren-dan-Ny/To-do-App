import CountUp from "react-countup";

function TotalTasksStat({ total }) {
  return (
    <div className="stat-card card-total">
      <h4>Tareas creadas</h4>
      <CountUp
        end={total}
        duration={1.2}
        formattingFn={(value) => String(value).padStart(2, "0")}
      />
    </div>
  );
}

export default TotalTasksStat;
