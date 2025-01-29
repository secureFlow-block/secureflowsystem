import { useEffect, useRef, useState } from "react";
import logoSecureFlow from "../assets/logo-secureflow.svg";
import screenLogin from "../assets/screen-login.svg";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);
  const navLinksRef = useRef(null);
  const hamburgerButtonRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Fechar o modal
      if (modalRef.current && !modalRef.current.contains(event.target) && isModalOpen) {
        setIsModalOpen(false);
      }

      // Fechar o menu de navegação (hambúrguer)
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
      // Fecha o menu ao rolar
      if (isOpen) {
        setIsOpen(false);
      }
    };

    // Adiciona eventos de clique fora e rolagem
    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove eventos ao desmontar
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, isModalOpen]);
  // Dependências: reexecuta sempre que isOpen ou isModalOpen mudar

  // Função para alternar entre os estados de login e cadastro
  const handleToggleForm = () => {
    setIsLogin(!isLogin); // Alterna entre login e cadastro
    setErrors({}); // Limpa os erros de validação
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }); // Limpa os dados do formulário
  };

  // Expressão regular para validar o formato do e-mail
  const invalidEmailRegex = /^[^@]+@[^@]+\.[^@]+$/;

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value })); // Atualiza os dados do formulário

    // Validação do campo 'name': garante que o nome tenha pelo menos 5 caracteres
    if (id === "name" && value.length >= 5) {
      setErrors((prev) => ({ ...prev, name: null })); // Limpa o erro se válido
    }

    // Validação do campo 'email': verifica se o e-mail é válido usando regex
    if (id === "email") {
      if (!invalidEmailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: "O e-mail não pode conter apenas o '@'." })); // Mensagem de erro se inválido
      } else {
        setErrors((prev) => ({ ...prev, email: null })); // Limpa o erro se válido
      }
    }

    // Validação do campo 'password': garante que a senha tenha pelo menos 8 caracteres
    if (id === "password" && value.length >= 8) {
      setErrors((prev) => ({ ...prev, password: null })); // Limpa o erro se válido
    }

    // Validação do campo 'confirmPassword': verifica se a senha e a confirmação de senha são iguais
    if (id === "confirmPassword") {
      if (value !== formData.password) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "As senhas não coincidem.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: null }));
      }
    }
  };

  // Função para validar o formulário antes de envio
  const validateForm = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validações para campos
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

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true); // Ativa o loader

      setTimeout(() => {
        setIsLoading(false); // Desativa o loader
        setSuccessMessage(isLogin ? "Login efetuado com sucesso!" : "Cadastro realizado com sucesso!");

        // Limpa o formulário
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        if (!isLogin) {
          // Se for cadastro, alterna para tela de login
          setTimeout(() => {
            setIsModalOpen(false); // Fecha o modal
            setIsLogin(true); // Altera para login
            setIsModalOpen(true); // Reabre no modo login
            setSuccessMessage(""); // Limpa a mensagem
          }, 2000); // Pequena transição
        } else {
          // Para login, apenas limpa o modal e mensagem
          setTimeout(() => {
            setSuccessMessage("");
            setIsModalOpen(false);
          }, 3000);
        }
      }, 3000);
    }
  };

  //Funçã para controlar o botão de mostrar/esconde senha
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Função para lidar com o clique no botão
  const handleButtonClick = () => {
    setIsLoading(true); // Ativa o loader
    setTimeout(() => {
      setIsLoading(false); // Desativa o loader após 3 segundos
      setIsModalOpen(true); // Abre o modal (ou realiza outra ação)
    }, 3000);
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
            className={`nav-links fixed top-14 left-0 right-0 bg-gray-800 text-white w-full h-0 overflow-hidden transition-all duration-300 ease-in-out md:static md:w-auto md:h-auto md:overflow-visible md:flex md:bg-transparent md:text-white ${
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
            className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 md:mx-0 overflow-hidden flex flex-col md:flex-row relative animate-fadeInScal"
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

                <form className="space-y-6" onSubmit={validateForm}>
                  {!isLogin && (
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nome Completo
                      </label>
                      <input
                        autoFocus
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border text-purple-500 text-bold border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 caret-purple-500"
                        placeholder="Seu nome completo"
                      />
                      {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      E-mail
                    </label>
                    <input
                      autoFocus
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border text-purple-500 text-bold border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 caret-purple-500"
                      placeholder="Digite seu email"
                    />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Senha
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.password ? "text" : "password"}
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border text-purple-500 text-bold border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 caret-purple-500"
                        placeholder="Digite sua senha"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("password")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                      >
                        <i className={`fas ${showPassword.password ? "fa-eye-slash" : "fa-eye"} text-xl`}></i>
                      </button>
                    </div>
                    {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}

                    {!isLogin && (
                      <div className="mt-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                          Confirmar Senha
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword.confirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border text-purple-500 text-bold border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 caret-purple-500"
                            placeholder="Confirme sua senha"
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility("confirmPassword")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                          >
                            <i className={`fas ${showPassword.confirmPassword ? "fa-eye-slash" : "fa-eye"} text-xl`}></i>
                          </button>
                        </div>
                        {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition relative flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? <span className="loader"></span> /* Loader visível */ : isLogin ? "Entrar" : "Cadastrar"}
                  </button>
                </form>

                <div className="flex justify-center items-center gap-2 mt-6">
                  <span className="text-sm text-gray-600">{isLogin ? "Ainda não tem uma conta?" : "Já tem uma conta?"}</span>
                  <button onClick={handleToggleForm} className="text-sm text-blue-600 hover:text-blue-800">
                    {isLogin ? "Cadastre-se" : "Login"}
                  </button>
                </div>
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
