import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskStats from "../components/TaskStats";

function DashboardLayout({
  tasks,
  onAddTask,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  const [date, setDate] = useState(new Date());

  // dia de la semana
  const weekday = date
    .toLocaleDateString("es-ES", { weekday: "long" })
    .replace(/^\w/, (c) => c.toUpperCase());

  // fecha formateada
  const formattedDate = date
    .toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/de /g, "");

  return (
    <main className="dashboard-layout">
      {/* seccion tareas y calendario */}
      <section className="dashboard-top">
        <aside className="dashboard-calendar">
          <div className="calendar-header">
            <h3 className="calendar-day">{weekday}</h3>
            <p className="calendar-date">{formattedDate}</p>
          </div>
          <Calendar
            formatMonthYear={(locale, date) =>
              date
                .toLocaleDateString("es-ES", { month: "long" })
                .replace(/^\w/, (c) => c.toUpperCase())
            }
          />
        </aside>
        <section className="dashboard-tasks">
          <TaskForm onAddTask={onAddTask} />
          <TaskList
            tasks={tasks}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </section>
      </section>

      <section className="dashboard-stats">
        <TaskStats tasks={tasks} />
      </section>
    </main>
  );
}
export default DashboardLayout;
