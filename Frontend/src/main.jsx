import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import LogAlteracao from "./components/LogAlteracao.jsx";
import ToggleSidebar from "./ToggleSidebar.jsx";
import Settings from "./components/Settings.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
  },
  {
    path: "/togglesidebar", 
    element: <ToggleSidebar />,
    children: [
      {
        path: "logalteracao", 
        element: <LogAlteracao />,
      },
      {
        path: "settings", 
        element: <Settings />,
      },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);