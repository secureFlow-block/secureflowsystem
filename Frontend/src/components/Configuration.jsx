// Configuration.jsx (ou o nome do seu componente principal)
import Sidebar from "../pages/Sidebar";
import Header from "../pages/Header";
import { useState } from "react";

const Configuration = () => {
  const [breadcrumb, setBreadcrumb] = useState("Configurações");

  const handleSidebarLinkClick = (text) => {
    setBreadcrumb(text);
  };

  return (
    <div className="flex flex-col h-auto min-h-screen sm:flex-row">
      <Sidebar onLinkClick={handleSidebarLinkClick} />
      {/* Botão do menu no modo tablet */}
      <div className="flex-1 flex flex-col h-auto lg:ml-64">
        <Header breadcrumb={breadcrumb} />
        <div className="content flex flex-col px-5 pt-5 pb-0 md:px-10 md:pt-10 md:space-x-6 md:flex-row">
          <h1 className="text-2xl text-title font-bold">Perfil</h1>
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
                    <h2 className="text-xl text-gray">Resumo do seu perfil</h2>
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
                    <div className="w-[110px] h-[110px] bg-gray-300 rounded-full cursor-pointer" onClick={() => toggleAvatar(this)}>
                      <img src="./image/avatar1.jpg" alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    </div>
                    <div className="text-center md:text-left">
                      <p className="text-lg font-semibold text-gray">Nome</p>
                      <p className="text-xl text-gray-500">Administrador</p>
                    </div>
                  </div>

                  <div className="space-y-2 pb-8 mb-8 border-b-[0.1px] border-solid" style={{borderColor: "rgba(0, 0, 0, 0.2)"}}>
                    <p className="text-base break-all break-words text-gray-500"><span className="text-gray">CPF/CNPJ:</span> XXX.XXX.XXX-XX</p>
                    <p className="text-base break-all break-words text-gray-500">
                      <span className="text-gray w-full">E-mail:</span> seuemail@empresarial.com
                    </p>
                    <p className="text-base break-all break-words text-gray-500"><span className="text-gray">Telefone:</span> (XX) XXXXX - XXXX</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl text-gray-800">Acessos</h3>
                    <p className="text-base text-gray-600">
                      <span className="font-medium text-gray-800">Nível de acesso:</span> Administrador (gerencia usuários e configurações)
                    </p>
                    <p className="text-base text-gray-600"><span className="font-medium text-gray-800">Último acesso em:</span> 00 de mês de 0000</p>

                    <h3 className="text-lg text-gray-800 mt-4">Permissões Específicas:</h3>

                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 text-gray-700 cursor-pointer">
                        <input type="checkbox" className="peer hidden" />
                        <span
                          className="list w-5 h-5 flex items-center justify-center border-2 border-gray-400 bg-gray-300 rounded-md peer-checked:bg-gray-500 peer-checked:border-gray-500 peer-checked:text-white before:content-['✓'] before:hidden peer-checked:before:block"
                        ></span>
                        <span className="text-sm md:text-base break-words">Criar, editar e excluir usuários</span>
                      </label>

                      <label className="flex items-center space-x-3 text-gray-700 cursor-pointer">
                        <input type="checkbox" className="peer hidden" />
                        <span
                          className="list w-5 h-5 flex items-center justify-center border-2 border-gray-400 bg-gray-300 rounded-md peer-checked:bg-gray-500 peer-checked:border-gray-500 peer-checked:text-white before:content-['✓'] before:hidden peer-checked:before:block"
                        ></span>
                        <span className="text-sm md:text-base break-words">Gerenciar empresas cadastradas</span>
                      </label>

                      <label className="flex items-center space-x-3 text-gray-700 cursor-pointer">
                        <input type="checkbox" className="peer hidden" />
                        <span
                          className="list w-5 h-5 flex items-center justify-center border-2 border-gray-400 bg-gray-300 rounded-md peer-checked:bg-gray-500 peer-checked:border-gray-500 peer-checked:text-white before:content-['✓'] before:hidden peer-checked:before:block"
                        ></span>
                        <span className="text-sm md:text-base break-words">Consultar registros no blockchain</span>
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
                <h2 className="text-xl font-bold mb-4">Segurança da conta</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Para garantir a segurança da sua senha, ela deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra
                  minúscula, um número e um caractere especial (!@#$%^&*).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-16">
                  {/* Coloque um label para cada input */}
                  <label className="block relative">
                    <span className="text-bold">Senha atual</span>
                    <input
                      type="password"
                      placeholder=""
                      className="w-full p-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#10b981] bg-gray-100"
                    /><button type="button" className="absolute right-3 top-8" title="Show Password">
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </label>
                  <label className="block relative">
                    <span className="text-bold">Alterar senha</span>
                    <input
                      type="password"
                      placeholder=""
                      className="w-full p-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#10b981] bg-gray-100"
                    />
                    <button type="button" className="absolute right-3 top-8" title="Show Password">
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </label>
                  <label className="block relative">
                    <span className="text-bold">Confirmar senha</span>
                    <input
                      type="password"
                      placeholder=""
                      className="w-full mb-4 p-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-[#10b981] bg-gray-100"
                    /><button type="button" className="absolute right-3 top-8" title="Show Password">
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
                    <span className="bg-gray-200 text-gray-700 py-1 px-2 rounded-md text-sm">Português</span>
                  </p>
                </div>

                <p className="text-base text-gray-600">
                  <span className="font-medium text-gray-800">Notificações:</span> Escolha como deseja ser notificado sobre atualizações e atividades
                  importantes.
                </p>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3 text-gray-300 cursor-pointer">
                    <input type="checkbox" className="peer hidden" />
                    <span
                      className="list w-5 h-5 min-w-5 min-h-5 flex-shrink-0 flex items-center justify-center border-2 border-gray-400 bg-gray-300 rounded-md peer-checked:bg-gray-500 peer-checked:border-gray-500 peer-checked:text-white"
                    >
                      ✓
                    </span>

                    <i className="fas fa-envelope text-gray-500 text-lg"></i>
                    <span className="text-sm md:text-base break-words text-gray-700">E-mail – Receber alertas importantes e atualizações do sistema</span>
                  </label>

                  <label className="flex items-center space-x-3 text-gray-300 cursor-pointer">
                    <input type="checkbox" className="peer hidden" />
                    <span
                      className="list w-5 h-5 min-w-5 min-h-5 flex-shrink-0 flex items-center justify-center border-2 border-gray-400 bg-gray-300 rounded-md peer-checked:bg-gray-500 peer-checked:border-gray-500 peer-checked:text-white"
                    >
                      ✓
                    </span>

                    <i className="fas fa-desktop text-gray-500 text-lg"></i>
                    <span className="text-sm md:text-base break-words text-gray-700">Sistema – Exibir notificações dentro do painel administrativo</span>
                  </label>

                  <label className="flex items-center space-x-3 text-gray-300 cursor-pointer">
                    <input type="checkbox" className="peer hidden" />
                    <span
                      className="list w-5 h-5 min-w-5 min-h-5 flex-shrink-0 flex items-center justify-center border-2 border-gray-400 bg-gray-300 rounded-md peer-checked:bg-gray-500 peer-checked:border-gray-500 peer-checked:text-white"
                    >
                      ✓
                    </span>

                    <i className="fas fa-mobile-alt text-gray-500 text-lg"></i>
                    <span className="text-sm md:text-base break-words text-gray-700">Push – Notificações diretas no celular</span>
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
