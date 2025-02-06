package com.secureflow.secureflowsystem.utils;

import com.secureflow.secureflowsystem.exception.SenhaInvalidaException;

public class SenhaUtils {

    public static void validarSenha(String senha) throws SenhaInvalidaException {
        if (senha == null || senha.length() < 6) {
            throw new SenhaInvalidaException("A senha deve ter pelo menos 6 dígitos.");
        }

        boolean temMaiuscula = false;
        boolean temMinuscula = false;
        boolean temNumero = false;
        boolean temCaractereEspecial = false;

        for (char c : senha.toCharArray()) {
            if (Character.isUpperCase(c)) {
                temMaiuscula = true;
            } else if (Character.isLowerCase(c)) {
                temMinuscula = true;
            } else if (Character.isDigit(c)) {
                temNumero = true;
            } else if (!Character.isLetterOrDigit(c)) {
                temCaractereEspecial = true;
            }
        }

        if (!temMaiuscula) {
            throw new SenhaInvalidaException("A senha deve conter pelo menos uma letra maiúscula.");
        }
        if (!temMinuscula) {
            throw new SenhaInvalidaException("A senha deve conter pelo menos uma letra minúscula.");
        }
        if (!temNumero) {
            throw new SenhaInvalidaException("A senha deve conter pelo menos um número.");
        }
        if (!temCaractereEspecial) {
            throw new SenhaInvalidaException("A senha deve conter pelo menos um caractere especial.");
        }
    }
}