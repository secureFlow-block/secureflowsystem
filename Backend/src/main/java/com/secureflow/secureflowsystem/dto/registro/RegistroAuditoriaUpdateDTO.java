package com.secureflow.secureflowsystem.dto.registro;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegistroAuditoriaUpdateDTO(

        @NotBlank(message = "O tipo de alteração não pode estar em branco.")
        @Size(max = 10, message = "O tipo de alteração deve ter no máximo 10 caracteres.")
        String tipoAlteracao,

        @NotBlank(message = "Os detalhes da alteração não podem estar em branco.")
        String detalhesAlteracao,

        @NotBlank(message = "O hash da blockchain não pode estar em branco.")
        String hashBlockchain

) {}
