import { useState } from "react";
import { FaRegCheckCircle, FaTrashAlt, FaEdit, FaSave } from "react-icons/fa";

function TaskCard({ task, onToggleComplete, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [newDescription, setNewDescription] = useState(task.description || "");
  const [newCategory, setNewCategory] = useState(task.category || "");

  const handleEdit = () => {
    if (isEditing && newText.trim() !== "") {
      onEdit(task.id, {
        text: newText,
        description: newDescription,
        category: newCategory,
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    // inputs de edicion
    <li className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        {isEditing ? (
          <>
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
              <option value="">Selecciona una categoría</option>
              <option value="personal">Personal</option>
              <option value="work">Trabajo</option>
              <option value="studies">Estudios</option>
              <option value="urgent">Urgente</option>
              <option value="others">Otros</option>
            </select>
          </>
        ) : (
          <>
            <h3 className="task-title">{task.text}</h3>
            {task.description && (
              <h5 className="task-description">{task.description}</h5>
            )}
            {task.category && (
              <span className="task-category-label">{task.category}</span>
            )}
            {task.createdAt && (
              <span className="task-created">Creado el {task.createdAt}</span>
            )}
          </>
        )}
      </div>

      {/* botones de accion */}
      <div className="task-actions">
        <button
          onClick={() => onToggleComplete(task.id)}
          title={
            task.completed ? "Marcar como incompleta" : "Marcar como completada"
          }
        >
          {task.completed ? (
            <FaRegCheckCircle color="green" />
          ) : (
            <FaRegCheckCircle />
          )}
        </button>

        <button onClick={handleEdit} title={isEditing ? "Guardar" : "Editar"}>
          {isEditing ? <FaSave /> : <FaEdit />}
        </button>

        <button onClick={() => onDelete(task.id)} title="Eliminar">
          <FaTrashAlt />
        </button>
      </div>
    </li>
  );
}

export default TaskCard;
