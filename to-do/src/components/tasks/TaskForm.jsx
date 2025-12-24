import { useState } from "react";
import { RiAddLargeFill } from "react-icons/ri";

function TaskForm({ onAddTask }) {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text,
      description,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);
    setText("");
    setCategory("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe una tarea"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción (opcional)"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="task-category"
      >
        <option value="">Categoría</option>
        <option value="Personal">Personal</option>
        <option value="Trabajo">Trabajo</option>
        <option value="Estudios">Estudios</option>
        <option value="Urgente">Urgente</option>
        <option value="Otros">Otros</option>
      </select>
      <button type="submit">
        <RiAddLargeFill />
      </button>
    </form>
  );
}

export default TaskForm;
