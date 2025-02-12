package com.secureflow.secureflowsystem.service;

import com.secureflow.secureflowsystem.dto.tabela.TabelaRequestDTO;
import com.secureflow.secureflowsystem.dto.tabela.TabelaResponseDTO;
import com.secureflow.secureflowsystem.dto.tabela.TabelaUpdateDTO;
import com.secureflow.secureflowsystem.exception.DuplicateEntityException;
import com.secureflow.secureflowsystem.exception.ResourceNotFoundException;
import com.secureflow.secureflowsystem.model.Empresa;
import com.secureflow.secureflowsystem.model.TabelasSensiveis;
import com.secureflow.secureflowsystem.repository.EmpresaRepository;
import com.secureflow.secureflowsystem.repository.TabelasSensiveisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TabelasSensiveisService {

    private final TabelasSensiveisRepository repository;
    private final EmpresaRepository empresaRepository;

    @Transactional(readOnly = true)
    public List<TabelaResponseDTO> buscarTodos() {
        return repository.findAll().stream()
                .map(TabelaResponseDTO::new).toList();
    }

    @Transactional(readOnly = true)
    public TabelaResponseDTO buscarTabelaId(Long id) {
        return repository.findById(id)
                .map(TabelaResponseDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException("Tabela não encontrado."));
    }

    @Transactional
    public TabelaResponseDTO criarTabela(TabelaRequestDTO dto) {
        Empresa empresa = empresaRepository.findById(dto.empresaId())
                .orElseThrow(() -> new ResourceNotFoundException("Não existe empresa para o ID: " + dto.empresaId()));

        if (repository.existsByNomeTabela(dto.nome())) {
            throw new DuplicateEntityException("Já existe uma tabela com esse nome.");
        }

        TabelasSensiveis tabela = new TabelasSensiveis();
        tabela.setNomeTabela(dto.nome());
        tabela.setEmpresa(empresa);
        tabela = repository.save(tabela);
        return new TabelaResponseDTO(tabela);
    }

    @Transactional
    public TabelaResponseDTO atualizarTabela(Long id, TabelaUpdateDTO dto) {
        TabelasSensiveis tabela = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tabela não encontrado."));

        if (repository.existsByNomeTabelaAndNotId(dto.nome(), id)) {
            throw new DuplicateEntityException("Já existe uma tabela com esse nome.");
        }

        tabela.setNomeTabela(dto.nome());
        return new TabelaResponseDTO(repository.save(tabela));
    }

    @Transactional
    public void deletarTabela(Long id) {
        if (!repository.existsById(id)) {
            throw new  ResourceNotFoundException("Tabela não encontrado.");
        }
        repository.deleteById(id);
    }
}
