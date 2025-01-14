package com.secureflow.secureflowsystem.dto;

import com.secureflow.secureflowsystem.model.TabelasSensiveis;

import java.time.LocalDateTime;

public record TabelaResponseDTO(Long id, String nome, LocalDateTime dataDefinicao, String nomeEmpresa) {

    public TabelaResponseDTO(TabelasSensiveis tabela) {
        this(tabela.getTabelaId(), tabela.getNomeTabela(), tabela.getDataDefinicao(), tabela.getEmpresa().getNome());
    }
}
