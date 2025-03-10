import React, { useState } from "react";

const Login = ({ onSuccess, onChangeForm, errors, formData, handleChange, showPassword, togglePasswordVisibility, isLoading }) => {
  return (
    <form className="space-y-6" onSubmit={onSuccess}>
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
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition relative flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? <span className="loader"></span> : "Entrar"}
      </button>
      <div className="flex justify-center items-center gap-2 mt-6">
        <span className="text-sm text-gray-600">Ainda não tem uma conta?</span>
        <button onClick={onChangeForm} className="text-sm text-blue-600 hover:text-blue-800">
          Cadastre-se
        </button>
      </div>
    </form>
  );
};

import PropTypes from "prop-types";

Login.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onChangeForm: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  showPassword: PropTypes.object.isRequired,
  togglePasswordVisibility: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Login;
