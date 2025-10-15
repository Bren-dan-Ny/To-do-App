import { useState, useEffect } from "react";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //   Agregar tarea
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  //   Alternar completado
  const onToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  //   Editar tarea
  const editTask = (id, updatedFields) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  //   Eliminar tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  return (
    <>
      <DashboardLayout
        tasks={tasks}
        onAddTask={addTask}
        onToggleComplete={onToggleComplete}
        onEdit={editTask}
        onDelete={deleteTask}
      />
    </>
  );
}

export default App;
