package com.secureflow.secureflowsystem.dto.tabela;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TabelaUpdateDTO(

        @NotBlank(message = "O nome é obrigatório")
        @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
        String nome
) {
}
