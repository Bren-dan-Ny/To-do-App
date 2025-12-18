import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/footer.css";
import "./styles/index.css";
import "./styles/layout.css";
import "./styles/header.css";
import "./styles/components.css";
import "./styles/modal.css";
import "./styles/calendar.css";
import "./styles/stats.css";
import "./styles/responsive.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
