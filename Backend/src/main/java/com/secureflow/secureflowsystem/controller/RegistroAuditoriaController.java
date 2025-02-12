package com.secureflow.secureflowsystem.controller;

import com.secureflow.secureflowsystem.dto.registro.RegistroAuditoriaRequestDTO;
import com.secureflow.secureflowsystem.dto.registro.RegistroAuditoriaResponseDTO;
import com.secureflow.secureflowsystem.dto.registro.RegistroAuditoriaUpdateDTO;
import com.secureflow.secureflowsystem.service.RegistroAuditoriaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/registros")
@RequiredArgsConstructor
public class RegistroAuditoriaController {

    private final RegistroAuditoriaService registroService;

    @GetMapping
    public ResponseEntity<List<RegistroAuditoriaResponseDTO>> buscarTodos() {
        return ResponseEntity.ok(registroService.buscarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistroAuditoriaResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(registroService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<RegistroAuditoriaResponseDTO> criarRegistro(
            @Valid @RequestBody RegistroAuditoriaRequestDTO dto) {
        var registro = registroService.criarRegistroAuditoria(dto);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(registro.registroId()).toUri();

        return ResponseEntity.created(uri).body(registro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RegistroAuditoriaResponseDTO> atualizarRegistro(
            @PathVariable Long id,
            @Valid @RequestBody RegistroAuditoriaUpdateDTO dto) {
        return ResponseEntity.ok(registroService.atualizarRegistroAuditoria(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarRegistro(@PathVariable Long id) {
        registroService.deletarRegistroAuditoria(id);
        return ResponseEntity.noContent().build();
    }
}
