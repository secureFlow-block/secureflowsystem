import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import ScrollTopButton from "./components/ScrollTopButton";

function App() {
  useEffect(() => {
    const grid = document.querySelector(".blockchain-grid");

    if (!grid) return;

    let blocks = "";
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;
      blocks += `
        <div style="
          position: absolute;
          left: ${x}%;
          top: ${y}%;
          width: ${size}px;
          height: ${size}px;
          background: ${Math.random() > 0.5 ? "var(--primary)" : "var(--secondary)"};
          opacity: 0.3;
          border-radius: 50%;
          animation: float ${duration}s ${delay}s infinite alternate;
        "></div>
      `;
    }

    grid.innerHTML = blocks;
  }, []);

  return (
    <section className="bg-dark text-light min-h-screen">
      <div>
        <Navbar />
        <main>
          <Outlet /> 
        </main>
        <div className="blockchain-grid" style={{ position: "relative" }}></div> 
        <ScrollTopButton />
        <Footer />
      </div>
    </section>
  );
}

export default App;
