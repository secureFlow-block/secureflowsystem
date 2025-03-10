package com.secureflow.secureflowsystem.service;

import com.secureflow.secureflowsystem.model.Empresa;
import com.secureflow.secureflowsystem.repository.EmpresaRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class EmpresaService {
    @Autowired
    private EmpresaRepository empresaRepository;

    @Transactional
    public Empresa criarEmpresa(Empresa empresa) {
        System.out.println(">>> Criando empresa: " + empresa.getNome());
        return empresaRepository.save(empresa);
    }

    public List<Empresa> listarEmpresas() {
        List<Empresa> empresas = empresaRepository.findAll();
        System.out.println("🚀 Empresas encontradas no banco: " + empresas.size()); // TESTE
        return empresas;
    }
    
    // Buscar empresa por ID
    public Empresa buscarEmpresaPorId(Long id) {
        return empresaRepository.findById(id).orElse(null);
    }

    // Atualizar empresa
    public Empresa atualizarEmpresa(Long id, Empresa novaEmpresa) {
        Empresa empresaExistente = buscarEmpresaPorId(id);
        if (empresaExistente != null) {
            empresaExistente.setNome(novaEmpresa.getNome());
            empresaExistente.setCnpj(novaEmpresa.getCnpj());
            return empresaRepository.save(empresaExistente);
        }
        return null;
    }

    // Excluir empresa
    public void excluirEmpresa(Long id) {
        empresaRepository.deleteById(id);
    }

}
