package com.secureflow.secureflowsystem.controller;

import com.secureflow.secureflowsystem.dto.tabela.TabelaRequestDTO;
import com.secureflow.secureflowsystem.dto.tabela.TabelaResponseDTO;
import com.secureflow.secureflowsystem.dto.tabela.TabelaUpdateDTO;
import com.secureflow.secureflowsystem.service.TabelasSensiveisService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/tabelas")
@RequiredArgsConstructor
public class TabelasSensiveisController {

    private final TabelasSensiveisService service;

    @GetMapping
    public ResponseEntity<List<TabelaResponseDTO>> buscarTodos() {
        return ResponseEntity.ok(service.buscarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TabelaResponseDTO> buscarTabelaId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarTabelaId(id));
    }

    @PostMapping
    public ResponseEntity<TabelaResponseDTO> criarTabela(@Valid @RequestBody TabelaRequestDTO dto) {
        TabelaResponseDTO tabela = service.criarTabela(dto);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(tabela.id()).toUri();

        return ResponseEntity.created(uri).body(tabela);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TabelaResponseDTO> atualizarTabela(@PathVariable Long id, @Valid @RequestBody TabelaUpdateDTO dto) {
        return ResponseEntity.ok(service.atualizarTabela(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTabela(@PathVariable Long id) {
        service.deletarTabela(id);
        return ResponseEntity.noContent().build();
    }
}
