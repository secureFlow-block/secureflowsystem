package com.secureflow.secureflowsystem.controller;

import com.secureflow.secureflowsystem.model.Empresa;
import com.secureflow.secureflowsystem.service.EmpresaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    // Criar empresa
    @PostMapping
    public ResponseEntity<Empresa> criarEmpresa(@RequestBody Empresa empresa) {
        Empresa novaEmpresa = empresaService.criarEmpresa(empresa);
        return ResponseEntity.ok(novaEmpresa);
    }

    // Listar todas as empresas
    @GetMapping
    public ResponseEntity<List<Empresa>> listarEmpresas() {
        List<Empresa> empresas = empresaService.listarEmpresas();
        return ResponseEntity.ok(empresas);
    }

    // Buscar empresa por ID
    @GetMapping("/{id}")
    public ResponseEntity<Empresa> buscarEmpresaPorId(@PathVariable Long id) {
        Empresa empresa = empresaService.buscarEmpresaPorId(id);
        if (empresa != null) {
            return ResponseEntity.ok(empresa);
        }
        return ResponseEntity.notFound().build();
    }

    // Atualizar empresa
    @PutMapping("/{id}")
    public ResponseEntity<Empresa> atualizarEmpresa(@PathVariable Long id, @RequestBody Empresa novaEmpresa) {
        Empresa empresaAtualizada = empresaService.atualizarEmpresa(id, novaEmpresa);
        if (empresaAtualizada != null) {
            return ResponseEntity.ok(empresaAtualizada);
        }
        return ResponseEntity.notFound().build();
    }

    // Excluir empresa
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirEmpresa(@PathVariable Long id) {
        empresaService.excluirEmpresa(id);
        return ResponseEntity.noContent().build();
    }
}
