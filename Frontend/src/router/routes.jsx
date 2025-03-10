import { Routes, Route } from "react-router-dom";
import Configuration from "../components/Configuration";
import Home from "../Home";


function ConfigRoutes() {
  return (
    <Routes>
            <Route path="/" element={<Home />} />

      <Route path="/config" element={<Configuration />} />
     
    </Routes>
  );
}

export default ConfigRoutes;