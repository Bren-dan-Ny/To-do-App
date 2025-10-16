import { useState } from "react";
import { IoMdSend } from "react-icons/io";

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
        placeholder="Escribe una tarea..."
      />
      <textarea
        rows="1"
        cols="30"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción (opcional)"
      ></textarea>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="task-category"
      >
        <option value="">Categoría</option>
        <option value="personal">Personal</option>
        <option value="work">Trabajo</option>
        <option value="studies">Estudios</option>
        <option value="urgent">Urgente</option>
        <option value="others">Otros</option>
      </select>
      <button type="submit">
        <IoMdSend />
      </button>
    </form>
  );
}

export default TaskForm;
