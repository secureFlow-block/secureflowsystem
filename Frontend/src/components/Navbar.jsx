import { useEffect, useRef, useState, useContext } from "react";
import logoSecureFlow from "../assets/logo-secureflow.svg";
import screenLogin from "../assets/screen-login.svg";
import api from "../service/api";
import Login from "./Login";
import Cadastro from "./Cadastro";
import { Context } from "../context/authContext";
import { withRouter } from "react-router-dom";

const NavBar = () => {
  const { authenticated } = useContext(Context);
  console.log(`Situação: ${authenticated}`);
  // Removido useNavigate, usaremos this.props.history.push

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({ login: null, register: null });
  const modalRef = useRef(null);
  const navLinksRef = useRef(null);
  const hamburgerButtonRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && isModalOpen) {
        setIsModalOpen(false);
      }
      if (
        navLinksRef.current &&
        !navLinksRef.current.contains(event.target) &&
        hamburgerButtonRef.current &&
        !hamburgerButtonRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, isModalOpen]);

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const invalidEmailRegex = /^[^@]+@[^@]+\.[^@]+$/;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "name" && value.length >= 5) {
      setErrors((prev) => ({
        ...prev,
        name: null,
      }));
    }

    if (id === "email") {
      if (!invalidEmailRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "O e-mail não pode conter apenas o '@'.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: null,
        }));
      }
    }

    if (id === "password" && value.length >= 8) {
      setErrors((prev) => ({
        ...prev,
        password: null,
      }));
    }

    if (id === "confirmPassword") {
      if (value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "As senhas não coincidem.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: null,
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && (!formData.name || formData.name.length < 5)) {
      newErrors.name = "O nome deve ter pelo menos 5 caracteres.";
    }

    if (!formData.email || !invalidEmailRegex.test(formData.email)) {
      newErrors.email = "Por favor, insira um e-mail válido.";
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "A senha deve ter pelo menos 8 caracteres.";
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const result = await api.post("/administrador", {
        nome: formData.name,
        email: formData.email,
        senha: formData.password,
      });
      console.log(result);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage("Cadastro realizado com sucesso!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => {
          setIsModalOpen(false);
          setIsLogin(true);
          setIsModalOpen(true);
          setSuccessMessage("");
        }, 2000);
      }, 3000);
    } catch (error) {
      console.log("Erro: Cadastro não efetuado", error);
      setErrors({
        ...errors,
        register: "Erro ao realizar o cadastro. Tente novamente.",
      });
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const result = await api.post("/auth/login", {
        email: formData.email,
        senha: formData.password,
      });
      console.log(result);
      console.log(result.data);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage("Login efetuado com sucesso!");
        setFormData({
          email: "",
          password: "",
        });
        setTimeout(() => {
          setSuccessMessage("");
          setIsModalOpen(false);
          // Salvar o token no localStorage
          localStorage.setItem("token", JSON.stringify(result.data.token));
          // api.defaults.headers.common["Authorization"] = `Bearer ${result.data.token}`;
          api.defaults.headers.Authorization = `Bearer ${result.data.token}`;
          this.props.history.push("/home");
        }, 3000);
      }, 3000);
    } catch (error) {
      console.log("Erro: Usuário ou senha incorreta", error);
      if (error.response && error.response.status === 401) {
        setErrors({ ...errors, login: "Usuário ou senha incorreta." });
      } else {
        setErrors({ ...errors, login: "Usuário ou senha incorreta." });
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <>
      <header className="fixed w-full bg-dark/95 backdrop-blur-lg z-50 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" title="Home">
            <div className="flex items-center gap-2">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mr-2">
                <path d="M20 5L30 15L20 25L10 15L20 5Z" stroke="var(--secondary)" strokeWidth="2" />
                <path d="M20 15L30 25L20 35L10 25L20 15Z" stroke="var(--primary)" strokeWidth="2" />
              </svg>
              <span className="text-lg md:text-2xl font-bold text-light">SecureFlow</span>
            </div>
          </a>
          <div
            ref={navLinksRef}
            className={`fixed top-14 left-0 right-0 bg-gray-800 text-white w-full h-0 overflow-hidden transition-all duration-300 ease-in-out md:static md:w-auto md:h-auto md:overflow-visible md:flex md:bg-transparent md:text-white ${
              isOpen ? "h-[200px] top-16" : ""
            }`}
            style={{ zIndex: 10 }}
          >
            <a href="#" className="block mx-4 p-3 hover:bg-gray-700 hover:text-secondary transition duration-300 rounded-lg">
              Plataforma
            </a>
            <a href="#" className="block mx-4 p-3 hover:bg-gray-700 hover:text-secondary transition duration-300 rounded-lg">
              Soluções
            </a>
            <a
              href="https://secureflow.com/about"
              className="block mx-4 p-3 hover:bg-gray-700 hover:text-secondary transition duration-300 rounded-lg"
            >
              Sobre
            </a>
            <a href="#" className="block mx-4 p-3 hover:bg-gray-700 hover:text-secondary transition duration-300 rounded-lg">
              Contato
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition">
              {isLogin ? "Login" : "Cadastro"}
            </button>
            <button
              ref={hamburgerButtonRef}
              className="md:hidden focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 text-light transition duration-300 ease-in-out ${isOpen ? "transform rotate-90" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {isModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-500 ${
            isModalOpen ? "opacity-100 fade-in-down" : "opacity-0 fade-out-up"
          }`}
        >
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 md:mx-0 overflow-hidden flex flex-col md:flex-row relative animate-fadeInScale"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn-close absolute top-0 right-0 text-3xl z-10 text-primary hover:text-green-500 transition duration-300 ease-in-out sm:text-gray-100"
            >
              &times;
            </button>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
              <div className="w-full max-w-md">
                <div className="flex justify-center items-center gap-3 mb-12">
                  <img src={logoSecureFlow} alt="SecureFlow Logo" className="h-12" />
                  <span className="text-2xl font-semibold text-purple-900">SecureFlow</span>
                </div>
                {successMessage && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md text-center mb-4">{successMessage}</div>
                )}
                {isLogin ? (
                  <>
                    {errors.login && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-center mb-4">{errors.login}</div>
                    )}
                    <Login
                      onSuccess={loginUser}
                      onChangeForm={handleToggleForm}
                      errors={errors}
                      formData={formData}
                      handleChange={handleChange}
                      showPassword={showPassword}
                      togglePasswordVisibility={togglePasswordVisibility}
                      isLoading={isLoading}
                    />
                  </>
                ) : (
                  <>
                    {errors.register && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-center mb-4">{errors.register}</div>
                    )}
                    <Cadastro
                      onSuccess={registerUser}
                      onChangeForm={handleToggleForm}
                      errors={errors}
                      formData={formData}
                      handleChange={handleChange}
                      showPassword={showPassword}
                      togglePasswordVisibility={togglePasswordVisibility}
                      isLoading={isLoading}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:block w-1/2">
              <img src={screenLogin} alt="Tela de Login" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
