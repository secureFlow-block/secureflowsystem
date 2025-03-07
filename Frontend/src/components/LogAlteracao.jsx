import React from 'react'
import imageReact from '../assets/react.svg'

const LogAlteracao = () => {
  return (
    <>
        <div class="content flex flex-col px-5 pt-5 pb-0 md:px-10 md:pt-10 md:space-x-6 md:flex-row">
          <h1 class="text-[#1C0447] text-3xl text-title font-bold">Log de Alterações</h1>
        </div>
        {/*  Conteúdo Principal  */}
        <div class="content flex-1 flex flex-col p-3 lg:p-10 space-y-3 lg:space-y-0 lg:space-x-6 lg:flex-row">
          
          {/*  Detalhes da Empresa  */}
          <section class="flex-1 bg-white rounded shadow-[4px_4px_6px_rgba(0,0,0,0.2)] p-3 md:p-6">
            {/*  Título  */}
             {/* <h2 class="text-xl font-bold mb-6">Detalhes</h2>  */}

            {/*  Estrutura Principal  */}
            <div class="flex flex-col md:flex-row items-center justify-between mb-6">
              {/*  Avatar e informações  */}
              <div class="flex flex-col md:flex-row items-center">
                {/*  Avatar  */}
                <div class="w-16 h-16 bg-gray-300 rounded-full cursor-pointer flex-shrink-0 mr-4" onclick="toggleAvatar(this)">
                  <img src={imageReact} alt="Avatar" class="w-full h-full rounded-full object-cover" />
                </div>
                {/*  Informações  */}
                <div>
                  <p class="text-lg font-semibold text-gray-800">Nome da empresa</p>
                  <p class="text-sm text-gray-500">Administrador</p>
                </div>
              </div>
              {/* ID */}
              <p class="text-lg font-medium text-gray-500 flex-shrink-0">ID</p>
            </div>

            {/* Tabela */}
            <table class="w-full text-sm">
              <thead class="bg-[#2D1B4D]">
                <tr className='h-[8vh]'>
                  <th class="px-5 py-2 text-left text-white font-medium">Tabela alterada</th>
                  <th class="px-5 py-2 text-left text-white font-medium">Tipo de alteração</th>
                  <th class="px-5 py-2 text-left text-white font-medium">Detalhes da alteração</th>
                  <th class="px-5 py-2 text-left text-white font-medium">Data da alteração</th>
                  <th class="px-5 py-2 text-left text-white font-medium">Hash</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border px-5 py-2" data-label="Modificações">001</td>
                  <td class="border px-5 py-2" data-label="Data">Atualização</td>
                  <td class="border px-5 py-2" data-label="Usuário">Mudança de senha do usuário</td>
                  <td class="border px-5 py-2" data-label="Log">25/02/2025 14:32:10</td>
                  <td class="border px-5 py-2" data-label="Log">a3f9b8c7d6e5f4a2b1c0d9e8f7a6b5c4</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
    </>
  )
}

export default LogAlteracao