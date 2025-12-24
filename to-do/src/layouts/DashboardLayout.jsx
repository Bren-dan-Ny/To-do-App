import { useState, useEffect } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { RiAddLargeFill } from "react-icons/ri";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import TaskStats from "../components/tasks/TaskStats";
import TotalTasksStat from "../components/stats/TotalTasksStat";
import MotivationQuote from "../components/stats/MotivationQuote";

function DashboardLayout({
  tasks,
  onAddTask,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  const total = tasks.length;

  const [userName, setUserName] = useState("");
  const [showNameModal, setShowNameModal] = useState(false);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);
  const [showTaskFormModal, setShowTaskFormModal] = useState(false);

  // Guardar nombre en localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    } else {
      setShowNameModal(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // funcion guardar nombre
  const handleSaveName = (name) => {
    setUserName(name);
    localStorage.setItem("userName", name);
    setShowNameModal(false);
  };

  const handleOpenTaskModal = () => {
    setShowTaskFormModal(true);
  };
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
      {showNameModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¡Bienvenid@!</h3>
            <p>¿Cómo te llamas?</p>

            <input
              type="text"
              placeholder="Tu nombre"
              autoFocus
              onKeyDown={(e) => {
                const value = e.target.value.trim();
                if (e.key === "Enter" && value.length >= 2) {
                  handleSaveName(
                    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
                  );
                }
              }}
            />

            <button
              className="btn-continue"
              onClick={(e) => {
                const input = e.target.previousSibling;
                const value = input.value.trim();
                if (value.length >= 0) {
                  handleSaveName(
                    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
                  );
                }
              }}
            >
              Continuar
            </button>
          </div>
        </div>
      )}

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

      {/* Contenido principal */}
      <main className="dashboard-container">
        <h1 className="msg-welcome">
          {userName
            ? `Hola, ${userName}, ¡Empieza a planificar hoy!`
            : "Hola, ¡Empieza a planificar hoy!"}
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
                {isTablet ? (
                  <>
                    <button
                      className="add-task-btn"
                      onClick={() => setShowTaskFormModal(true)}
                    >
                      <RiAddLargeFill /> Agregar tarea
                    </button>

                    {showTaskFormModal && (
                      <div
                        className="modal-form-overlay"
                        onClick={() => setShowTaskFormModal(false)}
                      >
                        <div
                          className="modal-content-create"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="close-btn"
                            onClick={() => setShowTaskFormModal(false)}
                          >
                            ✕
                          </button>

                          <h2>Crear tarea</h2>
                          <TaskForm
                            onAddTask={(task) => {
                              onAddTask(task);
                              setShowTaskFormModal(false);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <TaskForm onAddTask={onAddTask} />
                )}
              </div>

              <TaskList
                tasks={tasks}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onEdit={onEdit}
                onAddTaskClick={handleOpenTaskModal}
              />
            </section>
          </section>

          {/* Estadisticas */}
          <section className="dashboard-stats">
            <TaskStats tasks={tasks} />
          </section>
        </section>

        {/* Stats mobile (fuera del layout) */}
        <section className="stats-mobile">
          <div className="container-total-motivation">
            <TotalTasksStat total={total} />
            <MotivationQuote />
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <div className="footer-logo">
          <img src="/favicon.png" alt="Logo" />
          <h2 className="footer-logo-name">Task Mate</h2>
        </div>
        <p>© 2024 Task Mate. Todos los derechos reservados.</p>
        <div className="icons-footer">
          <a href="">
            <FaGithub />
          </a>
          <a href="">
            <BsTwitterX />
          </a>
          <a href="">
            <FaFacebookF />
          </a>
        </div>
      </footer>
    </>
  );
}

export default DashboardLayout;
