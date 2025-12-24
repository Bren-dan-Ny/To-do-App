import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles//layout/footer.css";
import "./styles/base/index.css";
import "./styles/layout/layout.css";
import "./styles/layout/header.css";
import "./styles/components/components.css";
import "./styles/components/modal.css";
import "./styles/components/calendar.css";
import "./styles/components/stats.css";
import "./styles/responsive.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
