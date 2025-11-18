import { useState } from "react";
import TaskCard from "./TaskCard";
import SearchBar from "./SearchBar";

function TaskList({ tasks = [], onToggleComplete, onDelete, onEdit }) {
  const [visibleCount] = useState(4);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Filtrar usando el searchTerm recibido del layout
  const filteredTasks = sortedTasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleTasks = filteredTasks.slice(0, visibleCount);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="list-search-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
            <div className="empty-placeholder">
              {tasks.length === 0
                ? "No hay tareas todavía"
                : "No hay tareas que coincidan con tu búsqueda"}
            </div>
          )}
        </ul>
      </div>

      <button className="show-more-btn" onClick={handleOpenModal}>
        Ver Todas las Tareas
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>
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
