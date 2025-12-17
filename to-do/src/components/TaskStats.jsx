import { useState, useEffect } from "react";
import CountUp from "react-countup";

function TaskStats({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const motivationalQuotes = [
    "Cada tarea completada te acerca a tu mejor versión.",
    "Un pequeño progreso cada día suma grandes resultados.",
    "No busques perfección, busca constancia.",
    "Haz hoy lo que otros no quieren, y mañana vivirás como otros no pueden.",
  ];

  const [randomFrase, setRandomFrase] = useState("");

  useEffect(() => {
    const today = new Date().toDateString(); // ejemplo: "Thu Nov 06 2025"
    const savedData = JSON.parse(localStorage.getItem("dailyQuote"));

    if (savedData && savedData.date === today) {
      setRandomFrase(savedData.quote);
    } else {
      const newQuote =
        motivationalQuotes[
          Math.floor(Math.random() * motivationalQuotes.length)
        ];
      setRandomFrase(newQuote);
      localStorage.setItem(
        "dailyQuote",
        JSON.stringify({ date: today, quote: newQuote })
      );
    }
  }, []);

  return (
    <section className="container-stats-card">
      <div className="stat-card card-completed">
        <h4>
          Tareas <br /> Completadas
        </h4>
        <CountUp
          end={completed}
          duration={1.2}
          formattingFn={(value) => String(value).padStart(2, "0")}
        />
      </div>

      <div className="stat-card card-pending">
        <h4>
          Tareas <br /> Pendientes
        </h4>
        <CountUp
          end={pending}
          duration={1.2}
          formattingFn={(value) => String(value).padStart(2, "0")}
        />
      </div>

      <div className="container-total-motivation">
        <div className="stat-card card-total">
          <h4>Tareas creadas</h4>
          <CountUp
            end={total}
            duration={1.2}
            formattingFn={(value) => String(value).padStart(2, "0")}
          />
        </div>

        <div className="motivation-section">
          <h3>Frase del día</h3>
          <p className="motivational-quote">"{randomFrase}"</p>
        </div>
      </div>
    </section>
  );
}

export default TaskStats;
