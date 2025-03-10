// Sidebar.jsx
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import DashboardIcon from "../assets/image/dash.png";
import Company from "../assets/image/company.png";
import Report from "../assets/image/report.png";
import Settings from "../assets/image/settings.png";
import Logout from "../assets/image/Logout.png";
import Profile from "../assets/image/profile.png";
import { useContext } from "react";
import { Context } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Sidebar = ({ onLinkClick }) => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(Context);

  const logOut = () => {
    handleLogout(() => {
      navigate("/");
    });
  };
  const [activeLink, setActiveLink] = useState(localStorage.getItem("activeLink") || "");
  const sidebarRef = useRef(null);
  const menuBtnRef = useRef(null);

  const pageLinks = {
    "link-dashboard": "dashboard.html",
    "link-management": "management.html",
    "link-configuration": "configuration.html",
  };

  const toggleSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle("-translate-x-full");
      if (!sidebarRef.current.classList.contains("-translate-x-full")) {
        document.addEventListener("click", closeOnClickOutside);
      } else {
        document.removeEventListener("click", closeOnClickOutside);
      }
    }
  };

  const closeOnClickOutside = (event) => {
    if (sidebarRef.current && menuBtnRef.current) {
      if (!sidebarRef.current.contains(event.target) && !menuBtnRef.current.contains(event.target)) {
        sidebarRef.current.classList.add("-translate-x-full");
        document.removeEventListener("click", closeOnClickOutside);
      }
    }
  };

  const handleSidebarLinkClick = (e, id, text) => {
    e.preventDefault();
    setActiveLink(id);
    localStorage.setItem("activeLink", id);
    onLinkClick(text); // Passa o texto do link clicado para o componente pai
    const targetPage = pageLinks[id];
    if (targetPage) {
      window.location.href = targetPage;
    }
  };

  return (
    <aside
      id="sidebar"
      ref={sidebarRef}
      className="w-64 bg-sidebar text-white flex flex-col px-6 py-8 fixed z-20 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out h-full"
    >
      <div className="mb-8 flex min-h-0 h-auto">
        <a href="index.html" className="flex items-center justify-between mr-2 w-full">
          <div className="flex items-center justify-center mr-2">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mr-2">
              <path d="M20 5L30 15L20 25L10 15L20 5Z" stroke="var(--secondary)" strokeWidth="2" />
              <path d="M20 15L30 25L20 35L10 25L20 15Z" stroke="var(--primary)" strokeWidth="2" />
            </svg>
            <span className="text-2xl md:text-2xl font-black">SecureFlow</span>
          </div>
          {/* Botão de fechar no modo tablet */}
          <button className="text-white md:hidden text-xl" onClick={toggleSidebar} title="Close Sidebar">
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </a>
      </div>
      <nav className="flex-1 space-y-2 h-auto">
        <a
          href="#"
          id="link-dashboard"
          className={`sidebar-link flex items-center p-3 rounded-lg text-primary hover:bg-[#10b981] hover:text-white transition duration-600 ${
            activeLink === "link-dashboard" ? "bg-[#10b981] text-white" : ""
          }`}
          onClick={logOut}
        >
          <span className="mr-8">
            <img src={DashboardIcon} alt="Dashboard Icon" className="w-[23px]" />
          </span>
          Dashboard
        </a>

        <a
          href="#"
          id="link-management"
          className={`sidebar-link flex items-center p-3 rounded-lg text-primary hover:bg-[#10b981] hover:text-white transition duration-600 ${
            activeLink === "link-management" ? "bg-[#10b981] text-white" : ""
          }`}
          onClick={(e) => handleSidebarLinkClick(e, "link-management", "Empresas")}
        >
          <span className="mr-8">
            <img src={Company} alt="Company Icon" className="w-[23px]" />
          </span>
          Empresas
        </a>
        <a
          href="#"
          id="link-report"
          className="sidebar-link flex items-center p-3 rounded-lg text-primary hover:bg-[#10b981] hover:text-white transition duration-600"
        >
          <span className="mr-8">
            <img src={Report} alt="Report Icon" className="w-[23px]" />
          </span>
          Relatórios
        </a>
        <a
          href="#"
          id="link-configuration"
          className={`sidebar-link flex items-center p-3 rounded-lg text-primary hover:bg-[#10b981] hover:text-white transition duration-600 ${
            activeLink === "link-configuration" ? "bg-[#10b981] text-white" : ""
          }`}
          onClick={(e) => handleSidebarLinkClick(e, "link-configuration", "Configurações")}
        >
          <span className="mr-8">
            <img src={Settings} alt="Settings Icon" className="w-[23px]" />
          </span>
          Configurações
        </a>
      </nav>
      <div className="mt-auto min-h-0 h-auto">
        <a
          href="#"
          className="flex items-center text-primary hover:text-white transition duration-600 ease-in-out"
          onClick={logOut} // Aqui você chama a função `logOut` corretamente
        >
          <span className="mr-2">
            <img src={Logout} alt="Logout Icon" className="w-[23px]" />
          </span>
          Log out
        </a>

        <div className="flex items-center mt-4">
          <img src={Profile} alt="Profile Icon" className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <p className="font-medium">Nome</p>
            <p className="text-gray-400 text-sm">Administrador</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
};

export default Sidebar;
