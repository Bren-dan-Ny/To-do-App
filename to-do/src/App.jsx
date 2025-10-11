import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

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
      <div className="task-container">
        <h1>Lista de Tareas</h1>
        <TaskForm onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          onToggleComplete={onToggleComplete}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </div>
    </>
  );
}

export default App;
