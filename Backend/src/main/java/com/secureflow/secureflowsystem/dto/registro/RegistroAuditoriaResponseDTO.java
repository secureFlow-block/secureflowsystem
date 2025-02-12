package com.secureflow.secureflowsystem.dto.registro;

import com.secureflow.secureflowsystem.model.RegistroAuditoria;

import java.time.LocalDateTime;

public record RegistroAuditoriaResponseDTO(Long registroId, Long empresaId, Long tabelaId, Long operadorId,
                                           String tipoAlteracao, String detalhesAlteracao, LocalDateTime dataHora,
                                           String hashBlockchain) {

    public RegistroAuditoriaResponseDTO(RegistroAuditoria registro) {
        this(registro.getRegistroId(), registro.getEmpresa().getEmpresaId(), registro.getTabelasSensiveis().getTabelaId(), registro.getOperador().getOperadorId(), registro.getTipoAlteracao(), registro.getDetalhesAlteracao(), registro.getDataHora(), registro.getHashBlockchain());
    }
}
