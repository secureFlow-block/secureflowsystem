package com.secureflow.secureflowsystem.controller;

import com.secureflow.secureflowsystem.dto.AdministradorDTO;
import com.secureflow.secureflowsystem.dto.UpdateAdministradorRequest;
import com.secureflow.secureflowsystem.model.Administrador;
import com.secureflow.secureflowsystem.service.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<AdministradorDTO> getStudentById(@PathVariable Long id){
        return administradorService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping
    public Administrador createStudent(@RequestBody Administrador administrador){
        return administradorService.criarAdminstrador(administrador);
    }

    @PutMapping
    public Optional<AdministradorDTO> updateAdministrador(@RequestBody UpdateAdministradorRequest request){
        return administradorService.updateAdministrador(request);
    }

    @DeleteMapping("/{id}")
    public void deleteAdministrador(@PathVariable Long id){
       administradorService.deleteAdmistrador(id);
    }

}
