import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import AppRouter from "./routes/AppRouter";
// import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
)