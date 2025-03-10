package com.secureflow.secureflowsystem.controller;

import com.secureflow.secureflowsystem.dto.operador.OperadorRequestDTO;
import com.secureflow.secureflowsystem.dto.operador.OperadorResponseDTO;
import com.secureflow.secureflowsystem.dto.operador.OperadorUpdateDTO;
import com.secureflow.secureflowsystem.service.OperadorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/operadores")
@RequiredArgsConstructor
public class OperadorController {

    private final OperadorService service;

    @GetMapping
    public ResponseEntity<List<OperadorResponseDTO>> buscarTodos() {
        return ResponseEntity.ok(service.buscarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OperadorResponseDTO> buscarOperadorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<OperadorResponseDTO> criarOperador(@Valid @RequestBody OperadorRequestDTO dto) {
        var operador = service.criarOperador(dto);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(operador.operadorId()).toUri();

        return ResponseEntity.created(uri).body(operador);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OperadorResponseDTO> atualizarOperador(@PathVariable Long id, @Valid @RequestBody OperadorUpdateDTO dto) {
        return ResponseEntity.ok(service.atualizarOperador(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarOperador(@PathVariable Long id) {
        service.deletarOperador(id);
        return ResponseEntity.noContent().build();
    }
}
