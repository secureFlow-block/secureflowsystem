package com.secureflow.secureflowsystem.dto.operador;

import jakarta.validation.constraints.*;

public record OperadorRequestDTO(
        @NotBlank(message = "O campo 'nome' é obrigatório")
        @Size(min = 3, max = 100, message = "O campo 'nome' deve ter entre 3 e 100 caracteres")
        String nome,

        @Email(message = "O email informado não é válido.")
        String email,

        @NotBlank(message = "O campo 'cargo' é obrigatório")
        @Size(min = 3, max = 100, message = "O campo 'cargo' deve ter entre 3 e 100 caracteres")
        String cargo,

        @NotNull(message = "O campo 'empresaId' é obrigatório")
        @Positive(message = "O campo 'empresaId' deve ser um número positivo")
        Long empresaId) {
}

