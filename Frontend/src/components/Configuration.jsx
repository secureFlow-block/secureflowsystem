import { useState, useEffect, useRef } from "react";
import DashboardIcon from '../assets/image/dash.png'
import Company from '../assets/image/company.png'
import Report from '../assets/image/report.png'
import Settings from '../assets/image/settings.png'
import Logout from '../assets/image/Logout.png'
import Profile from '../assets/image/profile.png'
import Monitor from '../assets/image/monitor.png'

const Configuration = () => {
  const [activeLink, setActiveLink] = useState(
    localStorage.getItem("activeLink") || ""
  );
  const [breadcrumb, setBreadcrumb] = useState("Configurações");
  const [currentDate, setCurrentDate] = useState("");
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
      if (
        !sidebarRef.current.contains(event.target) &&
        !menuBtnRef.current.contains(event.target)
      ) {
        sidebarRef.current.classList.add("-translate-x-full");
        document.removeEventListener("click", closeOnClickOutside);
      }
    }
  };

  const updateDate = () => {
    const options = { weekday: "long", day: "2-digit", month: "long" };
    let dateStr = new Date().toLocaleDateString("pt-BR", options);
    dateStr = dateStr.replace("-feira", "");
    dateStr = dateStr.replace(/(^\w{1})|(\s\w{1})/g, (match) =>
      match.toUpperCase()
    );
    dateStr = dateStr.replace(" De ", " de ");
    setCurrentDate(dateStr);
  };

  useEffect(() => {
    updateDate();
  }, []);

  const toggleAvatar = (element) => {
    const img = element.querySelector("img");
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = function () {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          if (img) img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const handleSidebarLinkClick = (e, id, text) => {
    e.preventDefault();
    setActiveLink(id);
    setBreadcrumb(text);
    localStorage.setItem("activeLink", id);
    const targetPage = pageLinks[id];
    if (targetPage) {
      window.location.href = targetPage;
    }
  };

  return (
    <div className="flex flex-col h-auto min-h-screen sm:flex-row">
      {/* Botão do menu no modo tablet */}
      <button
        id="menu-btn"
        ref={menuBtnRef}
        className="lg:hidden absolute top-4 left-4 text-gray-700 text-2xl"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar fixo à esquerda */}
      <aside
        id="sidebar"
        ref={sidebarRef}
        className="w-64 bg-sidebar text-white flex flex-col px-6 py-8 fixed z-20 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out h-full"
      >
        <div className="mb-8 flex min-h-0 h-auto">
          <a href="index.html" className="flex items-center justify-between mr-2 w-full">
            <div className="flex items-center justify-center mr-2">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                className="mr-2"
              >
                <path
                  d="M20 5L30 15L20 25L10 15L20 5Z"
                  stroke="var(--secondary)"
                  strokeWidth="2"
                />
                <path
                  d="M20 15L30 25L20 35L10 25L20 15Z"
                  stroke="var(--primary)"
                  strokeWidth="2"
                />
              </svg>
              <span className="text-2xl md:text-2xl font-black">SecureFlow</span>
            </div>
            {/* Botão de fechar no modo tablet */}
            <button
              className="text-white md:hidden text-xl"
              onClick={toggleSidebar}
              title="Close Sidebar"
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </a>
        </div>
        <nav className="flex-1 space-y-2 h-auto">
          <a
            href=""
            id="link-dashboard"
            className={`sidebar-link flex items-center p-3 rounded-lg text-primary hover:bg-[#10b981] hover:text-white transition duration-600 ${
              activeLink === "link-dashboard" ? "bg-[#10b981] text-white" : ""
            }`}
            onClick={(e) =>
              handleSidebarLinkClick(e, "link-dashboard", "Dashboard")
            }
          >
            <span className="mr-8">
              <img src={DashboardIcon} alt="Dashboard Icon" className="w-[23px]" />
            </span>{" "}
            Dashboard
          </a>

          <a
            href=""
            id="link-management"
            className={`sidebar-link flex items-center p-3 rounded-lg text-primary hover:bg-[#10b981] hover:text-white transition duration-600 ${
              activeLink === "link-management" ? "bg-[#10b981] text-white" : ""
            }`}
            onClick={(e) =>
              handleSidebarLinkClick(e, "link-management", "Empresas")
            }
          >
            <span className="mr-8">
              <img src={Company} alt="Company Icon" className="w-[23px]" />
            </span>{" "}
            Empresas
          </a>
          <a
            href="#"
            id="link-report"
            className="sidebar-link flex items-center p-3 rounded-lg text-primary hover:bg-[#10b981] hover:text-white transition duration-600"
          >
            <span className="mr-8">
              <img src={Report} alt="Report Icon" className="w-[23px]" />
            </span>{" "}
            Relatórios
          </a>
          <a
            href="#"
            id="link-configuration"
            className={`sidebar-link flex items-center p-3 rounded-lg text-primary hover:bg-[#10b981] hover:text-white transition duration-600 ${
              activeLink === "link-configuration" ? "bg-[#10b981] text-white" : ""
            }`}
            onClick={(e) =>
              handleSidebarLinkClick(e, "link-configuration", "Configurações")
            }
          >
            <span className="mr-8">
              <img src={Settings} alt="Settings Icon" className="w-[23px]" />
            </span>{" "}
            Configurações
          </a>
        </nav>
        <div className="mt-auto min-h-0 h-auto">
          <a
            href="#"
            className="flex items-center text-primary hover:text-white transition duration-600 ease-in-out"
          >
            <span className="mr-2">
              <img src={Logout} alt="Logout Icon" className="w-[23px]" />
            </span>{" "}
            Log out
          </a>
          <div className="flex items-center mt-4">
            <img
              src={Profile}
              alt="Profile Icon"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="font-medium">Nome</p>
              <p className="text-gray-400 text-sm">Administrador</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col h-auto lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center lg:flex-row flex-col gap-4">
          {/* Links de navegação */}
          <div className="flex flex-col items-center gap-4 w-full lg:flex-row">
            <div className="flex items-center space-x-2">
              <a href="#" className="text-gray-500">
                Home
              </a>
              <span className="text-gray-400">&gt;</span>
              <span
                id="breadcrumb-main"
                className="text-gray-500 font-medium w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-left inline-block"
              >
                {breadcrumb}
              </span>
            </div>
            {/* Título "Monitorando" */}
            <div className="text-sm flex flex-col items-center space-x-2 py-2 rounded-lg md:flex-row">
              <span>
                <img
                  src={Monitor}
                  alt="Monitor Icon"
                  className="space-x-2 w-[23px]"
                />
              </span>
              <span className="mx-4 text-gray-500">Monitorando:</span>
              <span className="mx-4 text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
                27 eventos encontrados
              </span>
            </div>
          </div>

          {/* Barra de busca e data */}
          <div className="flex flex-col items-center justify-end gap-4 w-full lg:flex-row lg:gap-11 relative">
            <div className="relative w-full lg:w-[148px]">
              <input
                type="text"
                placeholder="Busca"
                className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10b981] bg-gray-100"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <i className="fas fa-search text-gray-400"></i>
              </div>
            </div>
            <span
              id="current-date"
              className="text-gray-500 font-medium w-full text-left lg:text-center lg:w-auto"
            >
              {currentDate}
            </span>
          </div>
        </header>
        <div className="content flex flex-col px-5 pt-5 pb-0 md:px-10 md:pt-10 md:space-x-6 md:flex-row">
          <h1 className="text-2xl text-title font-bold">Configurações</h1>
        </div>

        {/* Conteúdo Principal */}
        <div className="content flex-1 flex justify-center flex-col p-3 lg:p-10 space-y-3 lg:space-y-0 lg:space-x-6 lg:flex-row">
          {/* Detalhes da Empresa */}
          <section className="flex flex-col lg:flex-row gap-6">
            {/* Coluna Principal */}
            <div className="flex-1">
              <div className="p-6 flex flex-wrap justify-between bg-white shadow-[4px_4px_6px_rgba(0,0,0,0.2)] rounded-[5px] md:flex-row h-full">
                <div className="bg-white rounded-lg w-full h-full">
                  <div className="flex flex-wrap flex-col sm:flex-row justify-between mb-6 gap-2 w-auto">
                    <h2 className="text-2xl font-bold text-gray-700">Resumo do seu perfil</h2>
                    <div className="flex flex-1 flex-col w-full justify-end sm:flex-row gap-2">
                      <button className="px-4 py-2 bg-btn-gray text-white rounded text-sm hover:bg-gray-700 transition-colors duration-200">
                        Editar
                      </button>
                      <button className="px-4 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors duration-200">
                        Salvar
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8 my-[44px]">
                    <div
                      className="w-[110px] h-[110px] bg-gray-300 rounded-full cursor-pointer"
                      onClick={(e) => toggleAvatar(e.currentTarget)}
                    >
                      <img
                        src="./image/avatar1.jpg"
                        alt="Avatar"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-lg font-semibold text-gray-700">Nome</p>
                      <p className="text-xl text-gray-500">Administrador</p>
                    </div>
                  </div>

                  <div
                    className="space-y-2 pb-8 mb-8 border-b-[0.1px] border-solid"
                    style={{ borderColor: "rgba(0, 0, 0, 0.2)" }}
                  >
                    <p className="text-base break-all break-words text-gray-500">
                      <span className="text-gray">CPF/CNPJ:</span> XXX.XXX.XXX-XX
                    </p>
                    <p className="text-base break-all break-words text-gray-500">
                      <span className="text-gray w-full">E-mail:</span> seuemail@empresarial.com
                    </p>
                    <p className="text-base break-all break-words text-gray-500">
                      <span className="text-gray">Telefone:</span> (XX) XXXXX - XXXX
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl text-gray-800">Acessos</h3>
                    <p className="text-base text-gray-600">
                      <span className="font-medium text-gray-800">
                        Nível de acesso:
                      </span>{" "}
                      Administrador (gerencia usuários e configurações)
                    </p>
                    <p className="text-base text-gray-600">
                      <span className="font-medium text-gray-800">
                        Último acesso em:
                      </span>{" "}
                      00 de mês de 0000
                    </p>

                    <h3 className="text-lg text-gray-800 mt-4">
                      Permissões Específicas:
                    </h3>

                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 text-gray-700 cursor-pointer">
                        <input type="checkbox" className="peer hidden" />
                        <span className="list w-5 h-5 flex items-center justify-center border-2 border-gray-400 bg-gray-300 rounded-md peer-checked:bg-gray-500 peer-checked:border-gray-500 peer-checked:text-white before:content-['✓'] before:hidden peer-checked:before:block"></span>
                        <span className="text-sm md:text-base break-words">
                          Criar, editar e excluir usuários
                        </span>
                      </label>

                      <label className="flex items-center space-x-3 text-gray-700 cursor-pointer">
                        <input type="checkbox" className="peer hidden" />
                        <span className="list w-5 h-5 flex items-center justify-center border-2 border-gray-400 bg-gray-300 rounded-md peer-checked:bg-gray-500 peer-checked:border-gray-500 peer-checked:text-white before:content-['✓'] before:hidden peer-checked:before:block"></span>
                        <span className="text-sm md:text-base break-words">
                          Gerenciar empresas cadastradas
                        </span>
                      </label>

                      <label className="flex items-center space-x-3 text-gray-700 cursor-pointer">
                        <input type="checkbox" className="peer hidden" />
                        <span className="list w-5 h-5 flex items-center justify-center border-2 border-gray-400 bg-gray-300 rounded-md peer-checked:bg-gray-500 peer-checked:border-gray-500 peer-checked:text-white before:content-['✓'] before:hidden peer-checked:before:block"></span>
                        <span className="text-sm md:text-base break-words">
                          Consultar registros no blockchain
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna Lateral */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Segurança da Conta */}
              <div className="bg-white rounded shadow-[4px_4px_6px_rgba(0,0,0,0.2)] p-6 h-full">
                <h2 className="text-xl text-gray-700 font-bold mb-4">Segurança da conta</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Para garantir a segurança da sua senha, ela deve ter no mínimo 8 caracteres,
                  incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um
                  caractere especial (!@#$%^&*).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-16">
                  <label className="block relative">
                    <span className="text-bold text-gray-700">Senha atual</span>
                    <input
                      type="password"
                      placeholder=""
                      className="w-full p-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#10b981] bg-gray-100"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-8"
                      title="Show Password"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </label>
                  <label className="block relative">
                    <span className="text-bold text-gray-700">Alterar senha</span>
                    <input
                      type="password"
                      placeholder=""
                      className="w-full p-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#10b981] bg-gray-100"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-8"
                      title="Show Password"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </label>
                  <label className="block relative">
                    <span className="text-bold text-gray-700">Confirmar senha</span>
                    <input
                      type="password"
                      placeholder=""
                      className="w-full mb-4 p-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#10b981] bg-gray-100"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-8"
                      title="Show Password"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </label>
                </div>

                <button className="bg-green-500 text-white py-2 px-4 rounded w-full md:w-[221px] hover:bg-green-600 transition-colors duration-200">
                  Salvar nova senha
                </button>
              </div>

              {/* Preferências e Configurações */}
              <div className="bg-white rounded-lg shadow-[4px_4px_6px_rgba(0,0,0,0.2)] p-6 h-full">
                <div className="mb-4">
                  <p className="font-medium text-gray-700">
                    Idioma:
                    <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded-md text-sm">
                      Português
                    </span>
                  </p>
                </div>

                <p className="text-base text-gray-600">
                  <span className="font-medium text-gray-800">Notificações:</span> Escolha como
                  deseja ser notificado sobre atualizações e atividades importantes.
                </p>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3 text-gray-300 cursor-pointer">
                    <input type="checkbox" className="peer hidden" />
                    <span className="list w-5 h-5 min-w-5 min-h-5 flex-shrink-0 flex items-center justify-center border-2 border-gray-400 bg-gray-300 rounded-md peer-checked:bg-gray-500 peer-checked:border-gray-500 peer-checked:text-white">
                      ✓
                    </span>

                    <i className="fas fa-envelope text-gray-500 text-lg"></i>
                    <span className="text-sm md:text-base break-words text-gray-700">
                      E-mail – Receber alertas importantes e atualizações do sistema
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 text-gray-300 cursor-pointer">
                    <input type="checkbox" className="peer hidden" />
                    <span className="list w-5 h-5 min-w-5 min-h-5 flex-shrink-0 flex items-center justify-center border-2 border-gray-400 bg-gray-300 rounded-md peer-checked:bg-gray-500 peer-checked:border-gray-500 peer-checked:text-white">
                      ✓
                    </span>

                    <i className="fas fa-desktop text-gray-500 text-lg"></i>
                    <span className="text-sm md:text-base break-words text-gray-700">
                      Sistema – Exibir notificações dentro do painel administrativo
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 text-gray-300 cursor-pointer">
                    <input type="checkbox" className="peer hidden" />
                    <span className="list w-5 h-5 min-w-5 min-h-5 flex-shrink-0 flex items-center justify-center border-2 border-gray-400 bg-gray-300 rounded-md peer-checked:bg-gray-500 peer-checked:border-gray-500 peer-checked:text-white">
                      ✓
                    </span>

                    <i className="fas fa-mobile-alt text-gray-500 text-lg"></i>
                    <span className="text-sm md:text-base break-words text-gray-700">
                      Push – Notificações diretas no celular
                    </span>
                  </label>
                </div>

                <button className="bg-green-500 text-white py-2 px-4 rounded w-full md:w-56 mt-4 hover:bg-green-600 transition-colors duration-200">
                  Salvar alterações
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
