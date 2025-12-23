import CompletedPendingStats from "./taskStats/CompletedPendingStats";
import TotalTasksStat from "./taskStats/TotalTasksStat";
import MotivationQuote from "./taskStats/MotivationQuote";

function TaskStats({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <>
      <CompletedPendingStats completed={completed} pending={pending} />

      <div className="container-total-motivation">
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
