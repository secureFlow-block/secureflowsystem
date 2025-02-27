package com.secureflow.secureflowsystem.controller;

import com.secureflow.secureflowsystem.model.RegistroAuditoria;
import com.secureflow.secureflowsystem.service.BlockchainService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/blockchain")  // Define o caminho base para os endpoints
public class BlockchainController {

    private final BlockchainService blockchainService;

    public BlockchainController(BlockchainService blockchainService) {
        this.blockchainService = blockchainService;
    }

    @GetMapping("/ultimo-hash")
    public ResponseEntity<String> obterUltimoHash() {
        String ultimoHash = blockchainService.obterUltimoHashBlockchain();
        return ResponseEntity.ok(ultimoHash);
    }

    @PostMapping("/registrar")
    public ResponseEntity<RegistroAuditoria> registrarAlteracao(@RequestBody RegistroAuditoria registroAuditoria) {
        RegistroAuditoria registroSalvo = blockchainService.registrarAlteracao(registroAuditoria);
        return ResponseEntity.ok(registroSalvo);
    }
}
