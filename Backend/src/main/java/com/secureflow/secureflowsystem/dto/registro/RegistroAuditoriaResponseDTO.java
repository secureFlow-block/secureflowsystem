package com.secureflow.secureflowsystem.dto.registro;

import com.secureflow.secureflowsystem.model.RegistroAuditoria;

import java.time.LocalDateTime;

public record RegistroAuditoriaResponseDTO(Long registroId, String empresa, String tabela, String operador,
                                           String tipoAlteracao, String detalhesAlteracao, LocalDateTime dataHora,
                                           String hashBlockchain) {

    public RegistroAuditoriaResponseDTO(RegistroAuditoria registro) {
        this(registro.getRegistroId(), registro.getEmpresa().getNome(), registro.getTabelasSensiveis().getNomeTabela(), registro.getOperador().getNome(), registro.getTipoAlteracao(), registro.getDetalhesAlteracao(), registro.getDataHora(), registro.getHashBlockchain());
    }
}
