package com.secureflow.secureflowsystem.dto.operador;

import com.secureflow.secureflowsystem.model.Operador;

public record OperadorResponseDTO(Long operadorId, Long empresaId, String nome, String email, String cargo) {

    public OperadorResponseDTO(Operador operador) {
        this(operador.getOperadorId(), operador.getEmpresa().getEmpresaId(), operador.getNome(), operador.getEmail(), operador.getCargo());
    }
}
