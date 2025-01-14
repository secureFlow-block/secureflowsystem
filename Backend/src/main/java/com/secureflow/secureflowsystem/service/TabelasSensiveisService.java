package com.secureflow.secureflowsystem.service;

import com.secureflow.secureflowsystem.dto.TabelaDTO;
import com.secureflow.secureflowsystem.dto.TabelaResponseDTO;
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
    public TabelaResponseDTO buscarTabelaId(Long empresaId, Long id) {
        TabelasSensiveis tabela = repository.buscarTabelaPorId(empresaId, id)
                .orElseThrow(() -> new ResourceNotFoundException("Tabela não encontrada para a empresa " + empresaId + " e tabela " + id));
        return new TabelaResponseDTO(tabela);
    }

    @Transactional
    public TabelaResponseDTO criarTabela(Long empresaId, TabelaDTO dto) {
        TabelasSensiveis tabela = new TabelasSensiveis();

        tabela.setNomeTabela(dto.nome());

        Empresa empresa = empresaRepository.findById(empresaId)
                .orElseThrow(() -> new EntityNotFoundException("Não existe empresa para o ID: " + empresaId));

        tabela.setEmpresa(empresa);
        tabela = repository.save(tabela);
        return new TabelaResponseDTO(tabela);
    }

    @Transactional
    public TabelaResponseDTO atualizarTabela(Long empresaId, Long id, TabelaDTO dto) {
        TabelasSensiveis tabela = repository.buscarTabelaPorId(empresaId, id)
                .orElseThrow(() -> new ResourceNotFoundException("Tabela não encontrada para a empresa " + empresaId + " e tabela " + id));

        tabela.setNomeTabela(dto.nome());
        tabela = repository.save(tabela);

        return new TabelaResponseDTO(tabela);
    }

    @Transactional
    public void deletarTabela(Long empresaId, Long id) {
        TabelasSensiveis tabela = repository.buscarTabelaPorId(empresaId, id)
                .orElseThrow(() -> new ResourceNotFoundException("Tabela não encontrada para a empresa " + empresaId + " e tabela " + id));

        repository.delete(tabela);
    }
}
