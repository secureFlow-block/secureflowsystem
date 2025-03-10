import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../context/authContext";
import { withRouter } from "react-router-dom";
import Header from "./Header";


export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState("Dashboard");


  // Removido useNavigate, usaremos this.props.history.push
  const { handleLogout } = useContext(Context);

  const logout = () => {
    handleLogout(() => {
      this.props.history.push("/");
    });
  };


  useEffect(() => {
    updateDate();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const updateBreadcrumb = (text) => {
    setBreadcrumb(text);
  };

  const updateDate = () => {
    const options = { weekday: "long", day: "2-digit", month: "long" };
    let currentDate = new Date().toLocaleDateString("pt-BR", options);
    currentDate = currentDate.replace("-feira", "").replace(" De ", " de ");
    document.getElementById("current-date").textContent = currentDate;
  };

  return (
    <div className="flex flex-col h-auto min-h-screen sm:flex-row bg-gray-100 font-sans">
      <button
        id="menu-btn"
        className="lg:hidden absolute top-4 left-4 text-gray-700 text-2xl"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <aside
        className={`w-64 bg-gray-800 text-white flex flex-col px-6 py-8 fixed z-20 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out h-full`}
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="text-2xl font-black">SecureFlow</span>
          <button className="text-white lg:hidden text-xl" onClick={toggleSidebar}>
            ✖
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {["Dashboard", "Empresas", "Relatórios", "Configurações"].map((item) => (
            <button
              key={item}
              className="w-full text-left flex items-center p-3 rounded-lg text-gray-300 hover:bg-green-500 hover:text-white transition duration-300"
              onClick={() => updateBreadcrumb(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <button className="flex items-center text-gray-300 hover:text-white" type="button" onClick={logout}>
            🚪 Log out
          </button>
          <div className="flex items-center mt-4">
            <img src="./image/profile.png" alt="Profile Icon" className="w-10 h-10 rounded-full" />
            <div className="ml-3">
              <p className="font-medium">Nome</p>
              <p className="text-gray-400 text-sm">Administrador</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col lg:ml-64 p-6">
        <Header />

        <main className="mt-6 p-4 bg-white shadow rounded-lg">
          <p>Conteúdo principal aqui...</p>
        </main>
      </div>
    </div>
  );
}
