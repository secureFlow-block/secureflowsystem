package com.secureflow.secureflowsystem.dto.operador;

import jakarta.validation.constraints.*;

public record OperadorUpdateDTO(
        @NotBlank(message = "O campo 'nome' é obrigatório")
        @Size(min = 3, max = 100, message = "O campo 'nome' deve ter entre 3 e 100 caracteres")
        String nome,

        @Email(message = "O email informado não é válido.")
        String email,

        @NotBlank(message = "O campo 'cargo' é obrigatório")
        @Size(min = 3, max = 100, message = "O campo 'cargo' deve ter entre 3 e 100 caracteres")
        String cargo){
}

