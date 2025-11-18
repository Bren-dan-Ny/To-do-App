import Calendar from "react-calendar";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
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
  const [date] = useState(new Date());

  // Día de la semana
  const weekday = date
    .toLocaleDateString("es-ES", { weekday: "long" })
    .replace(/^\w/, (c) => c.toUpperCase());

  // Fecha formateada
  const formattedDate = date
    .toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .replace(/de /g, "")
    .replace(/^(\d+)/, "$1,")
    .replace(
      /, ([a-záéíóúñ]+)/i,
      (_, month) => `, ${month.charAt(0).toUpperCase() + month.slice(1)}`
    );

  return (
    <>
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-logo">
          <img src="/favicon.png" alt="Logo" />
          <h2 className="logo-name">Task Mate</h2>
        </div>
        <div className="header-profile">
          <IoPersonCircleOutline />
        </div>
      </header>

      <main className="dashboard-container">
        <h1 className="msg-welcome">
          Hello, Lhuana, ¡Empieza a planificar hoy!
        </h1>

        <section className="dashboard-layout">
          {/* Parte superior */}
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
              <div className="task-controls">
                <TaskForm onAddTask={onAddTask} />
              </div>

              {/* Ahora TaskList maneja su propio filtro */}
              <TaskList
                tasks={tasks}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </section>
          </section>

          {/* Estadísticas */}
          <section className="dashboard-stats">
            <TaskStats tasks={tasks} />
          </section>
        </section>
      </main>
    </>
  );
}

export default DashboardLayout;
