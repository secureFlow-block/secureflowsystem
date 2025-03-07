import React from 'react'
import { useState, useRef, useEffect } from "react";
import imageDash from './assets/dash.png'
import imageSettings from './assets/settings.png'
import imageLogout from './assets/Logout.png'
import imageAvatar from './assets/profile.png'
import imageMonitor from './assets/monitor.png'
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LogAlteracao from './components/LogAlteracao';
import Settings from './components/Settings';

const ToggleSidebar = () => {
  return (
    <>
    <body class="bg-gray-100 font-sans">
        <div class="flex flex-col h-auto min-h-screen sm:flex-row">
          {/*  Botão do menu no modo tablet  */}
          <button id="menu-btn" class="lg:hidden absolute top-4 left-4 text-gray-700 text-2xl" onclick="toggleSidebar()">☰</button>

          {/*  Sidebar fixo à esquerda  */}
          <aside
            id="sidebar"
            class="w-66 bg-[#2d1b4d] text-white flex flex-col px-6 py-8 fixed z-20 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out h-full"
          >
            <div class="mb-8 flex min-h-0 h-auto">
              <a href="index.html" class="flex items-center justify-between mr-2 w-full">
                <div class="flex items-center justify-center mr-2">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mr-2">
                    <path d="M20 5L30 15L20 25L10 15L20 5Z" stroke="var(--secondary)" strokeWidth="2" />
                    <path d="M20 15L30 25L20 35L10 25L20 15Z" stroke="var(--primary)" strokeWidth="2" />
                  </svg>
                  <span className="text-2xl md:text-2xl font-semibold">SecureFlow</span>
                </div>
                {/*  Botão de fechar no modo tablet  */}
                <button class="text-white md:hidden text-xl" onclick="toggleSidebar()" title="Close Sidebar">
                  <i class="fa fa-times" aria-hidden="true"></i>
                </button>
              </a>
            </div>

            <nav class="flex-1 space-y-2 h-auto">
              <a
                href=""
                id="link-dashboard"
                class="sidebar-link flex items-center p-3 rounded-lg text-primary hover:bg-[#10b981] hover:text-white transition duration-600"
              >
                <span class="mr-8"><img src={imageDash} alt="Dashboard Icon" class="w-[23px]" /></span> <Link path="logalteracao" to="LogAlteracao">Log de Alterações</Link> 
              </a>

              <a
                href="#"
                id="link-configuration"
                class="sidebar-link flex items-center p-3 rounded-lg text-primary hover:bg-[#10b981] hover:text-white transition duration-600"
              >
                <span class="mr-8"><img src={imageSettings} alt="Settings Icon" class="w-[23px]" /></span> <Link path="settings" to="Settings">Configurações</Link> 
              </a>
            </nav>

            <div class="mt-auto min-h-0 h-auto">
              <a href="#" class="flex items-center text-primary hover:text-white transition duration-600 ease-in-out">
                <span class="mr-2"><img src={imageLogout} alt="Logout Icon" class="w-[23px]" /></span> Log out
              </a>
              <div class="flex items-center mt-4">
                <img src={imageAvatar} alt="Profile Icon" class="w-10 h-10 rounded-full" />
                <div class="ml-3">
                  <p class="font-medium">Nome</p>
                  <p class="text-gray-400 text-sm">Administrador</p>
                </div>
              </div>
            </div>
          </aside>

          {/*  Conteúdo principal  */}
          <div class="flex-1 flex flex-col h-auto lg:ml-64">
            {/*  Header  */}
            <header class="bg-white shadow px-6 py-4 flex justify-between items-center lg:flex-row flex-col gap-4">
              {/*  Mostrano os links de navegação  */}
              <div class="flex flex-col items-center gap-4 w-full lg:flex-row">
                <div class="flex items-center space-x-5">
                  <a href="#" class="text-gray-500">Home</a>
                  <span class="text-gray-400">&gt;</span>
                  <span
                    id="breadcrumb-main"
                    class="text-gray-500 font-medium w-48 overflow-hidden text-ellipsis whitespace-nowrap text-left inline-block"
                    >Log de alterações</span>
                </div>
                {/*  Título "Monitorando"  */}
                <div class="text-sm flex flex-col items-center space-x-2 py-2 rounded-lg md:flex-row">
                  <span><img src={imageMonitor} alt="Monitor Icon" class="space-x-2 w-[23px]" /></span>
                  <span class="mx-4 text-gray-500">Monitorando:</span>
                  <span class="mx-4 text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">27 eventos encontrados</span>
                </div>
              </div>

              {/*  Barra de busca e data  */}
              <div class="flex flex-col items-center justify-end gap-4 w-full lg:flex-row lg:gap-11 relative">
                <div class="relative w-full lg:w-[148px]">
                  <input
                    type="text"
                    placeholder="Busca"
                    class="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10b981] bg-gray-100"
                  />
                  <div class="absolute inset-y-0 right-3 flex items-center">
                    <i class="fas fa-search text-gray-400 text-gray-400"></i>
                  </div>
                </div>
                <span id="current-date" class="text-gray-500 font-medium w-full text-left lg:text-center lg:w-auto"></span>
              </div>
            </header>

                  <Outlet />

          </div>
        </div>
      </body>
    </>
  )
}

export default ToggleSidebar