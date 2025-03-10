import { createContext, useEffect, useState } from "react";
import api from "../service/api";


const Context = createContext();
const AuthProvider = ({ children }) => {

  // Estado para controlar se o usuário está autenticado
  const [authenticated, setAuthenticated] = useState(false);

  const [loading, setLoading] = useState(true);

  // Verifica se o usuário está autenticado ou não
  useEffect(() => {
    const getLogin = async () => {
      // Para recuperar o token do localStorage
      const token = localStorage.getItem("token");
      // console.log(`token recuperado: ${JSON.parse(token)}`);

      // Se o token existir, significa que o usuário está autenticado
      if (token) {
        //Atribuindo o token no cabeçalho da requisição
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        setAuthenticated(true);
      }
      setLoading(false);
    };
    getLogin();
  }, []);

  //fazer o redirecionamento para a tela de login
  if (loading) {
    return <div>Carregando...</div>;
  }
  //Função para sair
  const handleLogout = (onLogout) => {
    console.log("Sair")
    localStorage.removeItem("token");
    setAuthenticated(false);
    // Redirecionar para a tela de login
    // navigate("/")
    if (onLogout) {
      onLogout(); // Chama a função de navegação passada pelo componente
    }
  };

  return (
    <div>
      <Context.Provider value={{ authenticated, handleLogout }}>{children}</Context.Provider>
    </div>
  );
};

import PropTypes from "prop-types";

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Context, AuthProvider };
