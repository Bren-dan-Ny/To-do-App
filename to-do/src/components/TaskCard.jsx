import { useState } from "react";
import { FaRegCheckCircle, FaTrashAlt, FaEdit } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";

function TaskCard({ task, onToggleComplete, onDelete, onEdit }) {
  const [newText, setNewText] = useState(task.text);
  const [newDescription, setNewDescription] = useState(task.description || "");
  const [newCategory, setNewCategory] = useState(task.category || "");
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    if (newText.trim() !== "") {
      onEdit(task.id, {
        text: newText,
        description: newDescription,
        category: newCategory,
      });
      setShowModal(false);
    }
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();
    const isYesterday =
      date.toDateString() ===
      new Date(now.setDate(now.getDate() - 1)).toDateString();

    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isToday) return `Hoy a las ${time}`;
    if (isYesterday) return `Ayer a las ${time}`;
    return date.toLocaleDateString() + " " + time;
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="content-edit-task">
              <FaTasks className="edit-task-modal-icon" />
              <h3>Editar tarea</h3>
            </div>

            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="edit-input"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Descripción (opcional)"
              className="edit-textarea"
            ></textarea>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="task-category"
            >
              <option value="Personal">Personal</option>
              <option value="Trabajo">Trabajo</option>
              <option value="Estudios">Estudios</option>
              <option value="Urgente">Urgente</option>
              <option value="Otros">Otros</option>
            </select>
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button className="btn-save" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      <li className={`task-card ${task.completed ? "completed" : ""}`}>
        <div className="container-card">
          <div className="container-left">
            <div className="task-info">
              <h3 className="task-title">
                {task.text.length > 30 ? task.text.slice(0, 30) : task.text}
              </h3>
              <span className="task-description">
                {task.description && task.description.trim() !== ""
                  ? task.description.length > 80
                    ? task.description.slice(0, 80) + "..."
                    : task.description
                  : "Sin descripción"}
              </span>
            </div>
            <div className="task-meta">
              <span className="task-category-label">
                {task.category && task.category.trim() !== ""
                  ? task.category
                  : "Otros"}
              </span>
              {task.createdAt && (
                <span className="task-created">
                  Creado {getFormattedDate(task.createdAt)}
                </span>
              )}
            </div>
          </div>

          <div className="container-right">
            <div className="task-actions">
              <button onClick={() => onToggleComplete(task.id)}>
                <FaRegCheckCircle
                  color={task.completed ? "green" : undefined}
                />
              </button>

              <button onClick={() => setShowModal(true)} title="Editar">
                <FaEdit />
              </button>

              <button onClick={() => onDelete(task.id)} title="Eliminar">
                <FaTrashAlt />
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default TaskCard;
