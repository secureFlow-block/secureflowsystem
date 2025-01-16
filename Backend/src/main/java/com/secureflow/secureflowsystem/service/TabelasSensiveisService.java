package com.secureflow.secureflowsystem.service;

import com.secureflow.secureflowsystem.dto.TabelaDTO;
import com.secureflow.secureflowsystem.dto.TabelaResponseDTO;
import com.secureflow.secureflowsystem.exception.DuplicateEntityException;
import com.secureflow.secureflowsystem.exception.ResourceNotFoundException;
import com.secureflow.secureflowsystem.model.Empresa;
import com.secureflow.secureflowsystem.model.TabelasSensiveis;
import com.secureflow.secureflowsystem.repository.EmpresaRepository;
import com.secureflow.secureflowsystem.repository.TabelasSensiveisRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TabelasSensiveisService {

    @Autowired
    private TabelasSensiveisRepository repository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Transactional(readOnly = true)
    public List<TabelaResponseDTO> buscarTodos(Long empresaId) {
        List<TabelasSensiveis> list = repository.buscarTabelasPorEmpresa(empresaId);
        return list.stream().map(TabelaResponseDTO::new).toList();
    }

    @Transactional(readOnly = true)
    public TabelaResponseDTO buscarTabelaId(Long empresaId, Long tabelaId) {
        TabelasSensiveis tabela = buscarTabela(empresaId, tabelaId);
        return new TabelaResponseDTO(tabela);
    }

    @Transactional
    public TabelaResponseDTO criarTabela(Long empresaId, TabelaDTO dto) {
        Empresa empresa = empresaRepository.findById(empresaId)
                .orElseThrow(() -> new EntityNotFoundException("Não existe empresa para o ID: " + empresaId));

        existeTabela(dto.nome());

        TabelasSensiveis tabela = new TabelasSensiveis();
        tabela.setNomeTabela(dto.nome());
        tabela.setEmpresa(empresa);
        tabela = repository.save(tabela);
        return new TabelaResponseDTO(tabela);
    }

    @Transactional
    public TabelaResponseDTO atualizarTabela(Long empresaId, Long tabelaId, TabelaDTO dto) {
        existeTabela(dto.nome());

        TabelasSensiveis tabela = buscarTabela(empresaId, tabelaId);
        tabela.setNomeTabela(dto.nome());
        tabela = repository.save(tabela);

        return new TabelaResponseDTO(tabela);
    }

    @Transactional
    public void deletarTabela(Long empresaId, Long tabelaId) {
        TabelasSensiveis tabela = buscarTabela(empresaId, tabelaId);
        repository.delete(tabela);
    }

    private TabelasSensiveis buscarTabela(Long empresaId, Long tabelaId) {
        TabelasSensiveis tabela = repository.buscarTabelaPorId(empresaId, tabelaId)
                .orElseThrow(() -> new ResourceNotFoundException("Tabela não encontrada com o ID: " + tabelaId));
        return tabela;
    }

    private void existeTabela(String nomeTabela) {
        if (repository.existsByNomeTabela(nomeTabela)) {
            throw new DuplicateEntityException("Tabela com o nome: " + nomeTabela + ", já existe.");
        }
    }
}
