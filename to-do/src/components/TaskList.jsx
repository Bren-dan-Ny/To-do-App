import { useState, useEffect } from "react";
import { RiAddLargeFill } from "react-icons/ri";
import TaskCard from "./TaskCard";
import SearchBar from "./SearchBar";

function TaskList({
  tasks = [],
  onToggleComplete,
  onDelete,
  onEdit,
  onAddTaskClick,
}) {
  const getVisibleCount = () => (window.innerWidth <= 1024 ? 2 : 4);

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showTaskFormModal, setShowTaskFormModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth <= 1024 ? 2 : 4);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // EFecto para el modal de mobile
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredTasks = sortedTasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleTasks = filteredTasks.slice(0, visibleCount);

  return (
    <>
      {/* SEARCH + BOTÓN (solo mobile por CSS) */}
      <div className="container-mobile-search">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <button
          className="add-task-btn add-task-mobile"
          onClick={onAddTaskClick}
        >
          <RiAddLargeFill /> Agregar
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.length > 0 ? (
          visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        ) : (
          <div className="no-results">
            {tasks.length === 0
              ? "No hay tareas todavía"
              : "No hay tareas que coincidan con tu búsqueda"}
          </div>
        )}
      </ul>

      <button className="show-more-btn" onClick={() => setShowModal(true)}>
        Ver Todas las Tareas
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content large"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✕
            </button>

            <h3 className="modal-title">Todas las tareas</h3>

            <ul className="modal-task-list">
              {sortedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskList;
