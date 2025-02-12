package com.secureflow.secureflowsystem.service;

import com.secureflow.secureflowsystem.dto.operador.OperadorRequestDTO;
import com.secureflow.secureflowsystem.dto.operador.OperadorResponseDTO;
import com.secureflow.secureflowsystem.dto.operador.OperadorUpdateDTO;
import com.secureflow.secureflowsystem.exception.DuplicateEntityException;
import com.secureflow.secureflowsystem.exception.ResourceNotFoundException;
import com.secureflow.secureflowsystem.model.Operador;
import com.secureflow.secureflowsystem.repository.EmpresaRepository;
import com.secureflow.secureflowsystem.repository.OperadorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OperadorService {

    private final OperadorRepository repository;
    private final EmpresaRepository empresaRepository;

    @Transactional(readOnly = true)
    public List<OperadorResponseDTO> buscarTodos() {
        return repository.findAll().stream().map(OperadorResponseDTO::new).toList();
    }

    @Transactional(readOnly = true)
    public OperadorResponseDTO buscarPorId(Long id) {
        return repository.findById(id).map(OperadorResponseDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException("Operador não encontrado."));
    }

    @Transactional
    public OperadorResponseDTO criarOperador(OperadorRequestDTO dto) {
        if (repository.existsByEmail(dto.email().toLowerCase())) {
            throw new DuplicateEntityException("Email já cadastrado para outro operador.");
        }

        Operador operador = new Operador();
        operador.setNome(dto.nome());
        operador.setEmail(dto.email().toLowerCase());
        operador.setCargo(dto.cargo());
        operador.setEmpresa(empresaRepository.findById(dto.empresaId())
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada.")));

        return new OperadorResponseDTO(repository.save(operador));
    }

    @Transactional
    public OperadorResponseDTO atualizarOperador(Long id, OperadorUpdateDTO dto) {
        Operador operador = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Operador não encontrado."));

        if (repository.existsByEmailAndNotId(dto.email().toLowerCase(), id)) {
            throw new DuplicateEntityException("Email já cadastrado para outro operador.");
        }

        operador.setNome(dto.nome());
        operador.setEmail(dto.email().toLowerCase());
        operador.setCargo(dto.cargo());

        return new OperadorResponseDTO(repository.save(operador));
    }

    @Transactional
    public void deletarOperador(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Operador não encontrado.");
        }
        repository.deleteById(id);
    }
}
