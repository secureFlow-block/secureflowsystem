package com.secureflow.secureflowsystem.controller;

import com.secureflow.secureflowsystem.dto.AdministradorDTO;
import com.secureflow.secureflowsystem.dto.UpdateAdministradorRequest;
import com.secureflow.secureflowsystem.exception.EmailAlreadyExistsException;
import com.secureflow.secureflowsystem.exception.SenhaInvalidaException;
import com.secureflow.secureflowsystem.model.Administrador;
import com.secureflow.secureflowsystem.service.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/administrador")
public class AdministradoresController {
    @Autowired
    private AdministradorService administradorService;

    @GetMapping
    public List<AdministradorDTO> getAdministradores(){
        return administradorService.getAll();
    }
    @GetMapping("/{id}")
    public ResponseEntity<AdministradorDTO> getAdministradorById(@PathVariable Long id){
        return administradorService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping
    public ResponseEntity<String> createAdministrador(@RequestBody Administrador administrador, BindingResult result) {
        if (result.hasErrors()) {
            // Captura o primeiro erro de validação e retorna a mensagem correspondente
            FieldError firstError = result.getFieldErrors().get(0);
            return ResponseEntity.badRequest().body(firstError.getDefaultMessage());
        }

        try {
            administradorService.criarAdministrador(administrador);
            return ResponseEntity.ok("Usuário registrado com sucesso!");
        } catch (EmailAlreadyExistsException | SenhaInvalidaException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping
    public Optional<AdministradorDTO> updateAdministrador(@RequestBody UpdateAdministradorRequest request){
        return administradorService.updateAdministrador(request);
    }

    @DeleteMapping("/{id}")
    public void deleteAdministrador(@PathVariable Long id){
       administradorService.deleteAdministrador(id);
    }

}
