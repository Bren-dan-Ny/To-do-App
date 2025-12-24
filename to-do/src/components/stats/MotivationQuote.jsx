import { useEffect, useState } from "react";

const motivationalQuotes = [
  "Cada tarea completada te acerca a tu mejor versión.",
  "Un pequeño progreso cada día suma grandes resultados.",
  "No busques perfección, busca constancia.",
  "Haz hoy lo que otros no quieren, y mañana vivirás como otros no pueden.",
];

function MotivationQuote() {
  const [randomFrase, setRandomFrase] = useState("");

  useEffect(() => {
    const today = new Date().toDateString();
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
    <div className="motivation-section">
      <h3>Frase del día</h3>
      <p className="motivational-quote">"{randomFrase}"</p>
    </div>
  );
}

export default MotivationQuote;
