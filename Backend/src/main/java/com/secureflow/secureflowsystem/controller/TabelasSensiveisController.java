package com.secureflow.secureflowsystem.controller;

import com.secureflow.secureflowsystem.dto.TabelaDTO;
import com.secureflow.secureflowsystem.dto.TabelaResponseDTO;
import com.secureflow.secureflowsystem.service.TabelasSensiveisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/empresas")
public class TabelasSensiveisController {

    @Autowired
    private TabelasSensiveisService service;

    @GetMapping("/{empresaId}/tabelas")
    public ResponseEntity<List<TabelaResponseDTO>> buscarTodos(@PathVariable Long empresaId) {
        List<TabelaResponseDTO> tabelas = service.buscarTodos(empresaId);
        return ResponseEntity.ok(tabelas);
    }

    @GetMapping("/{empresaId}/tabelas/{tabelaId}")
    public ResponseEntity<TabelaResponseDTO> buscarTabelaId(@PathVariable Long empresaId, @PathVariable Long tabelaId) {
        TabelaResponseDTO tabela = service.buscarTabelaId(empresaId, tabelaId);
        return ResponseEntity.ok(tabela);
    }

    @PostMapping("/{empresaId}/tabelas")
    public ResponseEntity<TabelaResponseDTO> criarTabela(@PathVariable Long empresaId, @RequestBody TabelaDTO dto) {
        TabelaResponseDTO tabela = service.criarTabela(empresaId, dto);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(tabela.id()).toUri();

        return ResponseEntity.created(uri).body(tabela);
    }

    @PutMapping("/{empresaId}/tabelas/{tabelaId}")
    public ResponseEntity<TabelaResponseDTO> atualizarTabela(
            @PathVariable Long empresaId,
            @PathVariable Long tabelaId,
            @RequestBody TabelaDTO dto) {

        TabelaResponseDTO tabela = service.atualizarTabela(empresaId, tabelaId, dto);
        return ResponseEntity.ok(tabela);
    }

    @DeleteMapping("/{empresaId}/tabelas/{tabelaId}")
    public ResponseEntity<Void> deletarTabela(@PathVariable Long empresaId, @PathVariable Long tabelaId) {
        service.deletarTabela(empresaId, tabelaId);
        return ResponseEntity.noContent().build();
    }
}
