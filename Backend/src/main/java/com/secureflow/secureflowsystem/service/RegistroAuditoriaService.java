package com.secureflow.secureflowsystem.service;
import com.secureflow.secureflowsystem.model.RegistroAuditoria;
import com.secureflow.secureflowsystem.repository.RegistroAuditoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistroAuditoriaService {

    @Autowired
    private RegistroAuditoriaRepository repository;

    public RegistroAuditoria salvarRegistro(Integer empresaId, Integer tabelaId, Integer operadorId, String tipoAlteracao, String detalhesAlteracao, String hashBlockchain) {
        RegistroAuditoria registro = new RegistroAuditoria(empresaId, tabelaId, operadorId, tipoAlteracao, detalhesAlteracao, hashBlockchain);
        return repository.save(registro);
    }

    public List<RegistroAuditoria> listarRegistros() {
        return repository.findAll();
    }
}
