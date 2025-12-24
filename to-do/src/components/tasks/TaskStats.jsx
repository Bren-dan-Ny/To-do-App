import CompletedPendingStats from "../stats/CompletedPendingStats";
import TotalTasksStat from "../stats/TotalTasksStat";
import MotivationQuote from "../stats/MotivationQuote";

function TaskStats({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <>
      <CompletedPendingStats completed={completed} pending={pending} />

      <div className="container-total-motivation motivation-desktop">
        <div className="total-tasks-wrapper">
          <TotalTasksStat total={total} />
        </div>

        <div className="motivation-wrapper">
          <MotivationQuote />
        </div>
      </div>
    </>
  );
}

export default TaskStats;
