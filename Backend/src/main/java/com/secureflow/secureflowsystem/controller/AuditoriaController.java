package com.secureflow.secureflowsystem.controller;

import com.secureflow.secureflowsystem.model.RegistroAuditoria;
import com.secureflow.secureflowsystem.service.RegistroAuditoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auditoria")
public class AuditoriaController {

    @Autowired
    private RegistroAuditoriaService registroAuditoriaService;

    @PostMapping("/registrar")
    public ResponseEntity<RegistroAuditoria> registrarAlteracao(
            @RequestParam Integer empresaId,
            @RequestParam Integer tabelaId,
            @RequestParam Integer operadorId,
            @RequestParam String tipoAlteracao,
            @RequestParam String detalhesAlteracao,
            @RequestParam String hashBlockchain
    ) {
        RegistroAuditoria registro = registroAuditoriaService.salvarRegistro(empresaId, tabelaId, operadorId, tipoAlteracao, detalhesAlteracao, hashBlockchain);
        return ResponseEntity.ok(registro);
    }

    @GetMapping("/listar")
    public ResponseEntity<List<RegistroAuditoria>> listarRegistros() {
        return ResponseEntity.ok(registroAuditoriaService.listarRegistros());
    }
}
