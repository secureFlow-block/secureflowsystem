package com.secureflow.secureflowsystem.dto.tabela;

import com.secureflow.secureflowsystem.model.TabelasSensiveis;

import java.time.LocalDateTime;

public record TabelaResponseDTO(Long id, String nome, LocalDateTime dataDefinicao, Long empresaId) {

    public TabelaResponseDTO(TabelasSensiveis tabela) {
        this(tabela.getTabelaId(), tabela.getNomeTabela(), tabela.getDataDefinicao(), tabela.getEmpresa().getEmpresaId());
    }
}
