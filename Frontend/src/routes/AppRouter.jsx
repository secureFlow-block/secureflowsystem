import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import { AuthProvider } from "../context/authContext";
import Home from "../pages/Home";
import Configuration from "../components/Configuration";

function AppRouter() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/config" element={<Configuration />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default AppRouter;
