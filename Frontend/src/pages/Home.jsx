import { useContext } from "react";
import { Context } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(Context);

  const logout = () => {
    handleLogout(() => {
      navigate("/");
    });
  };
  return (
    <div>
      <h1>Homeeee</h1>
      {/* Botão para sair */}
      <button type="button" onClick={logout}>
        Sair
      </button>
    </div>
  );
};

export default Home;
