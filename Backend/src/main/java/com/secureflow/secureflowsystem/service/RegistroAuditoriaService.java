package com.secureflow.secureflowsystem.service;

import com.secureflow.secureflowsystem.dto.registro.RegistroAuditoriaRequestDTO;
import com.secureflow.secureflowsystem.dto.registro.RegistroAuditoriaResponseDTO;
import com.secureflow.secureflowsystem.dto.registro.RegistroAuditoriaUpdateDTO;
import com.secureflow.secureflowsystem.exception.ResourceNotFoundException;
import com.secureflow.secureflowsystem.model.Empresa;
import com.secureflow.secureflowsystem.model.Operador;
import com.secureflow.secureflowsystem.model.RegistroAuditoria;
import com.secureflow.secureflowsystem.model.TabelasSensiveis;
import com.secureflow.secureflowsystem.repository.EmpresaRepository;
import com.secureflow.secureflowsystem.repository.OperadorRepository;
import com.secureflow.secureflowsystem.repository.RegistroAuditoriaRepository;
import com.secureflow.secureflowsystem.repository.TabelasSensiveisRepository;
import com.secureflow.secureflowsystem.service.BlockchainService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RegistroAuditoriaService {

    private final RegistroAuditoriaRepository registroRepository;
    private final EmpresaRepository empresaRepository;
    private final TabelasSensiveisRepository tabelasSensiveisRepository;
    private final OperadorRepository operadorRepository;
    private final BlockchainService blockchainService;

    @Transactional(readOnly = true)
    public List<RegistroAuditoriaResponseDTO> buscarTodos() {
        return registroRepository.findAll().stream()
                .map(RegistroAuditoriaResponseDTO::new).toList();
    }

    @Transactional(readOnly = true)
    public RegistroAuditoriaResponseDTO buscarPorId(Long id) {
        return registroRepository.findById(id)
                .map(RegistroAuditoriaResponseDTO::new)
                .orElseThrow(() -> new ResourceNotFoundException("Registro não encontrado."));
    }

    @Transactional
    public RegistroAuditoriaResponseDTO criarRegistroAuditoria(RegistroAuditoriaRequestDTO dto) {
        Empresa empresa = empresaRepository.findById(dto.empresaId())
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada."));

        TabelasSensiveis tabela = tabelasSensiveisRepository.findById(dto.tabelaId())
                .orElseThrow(() -> new ResourceNotFoundException("Tabela não encontrada."));

        Operador operador = operadorRepository.findById(dto.operadorId())
                .orElseThrow(() -> new ResourceNotFoundException("Operador não encontrado."));

        try {
            // 🔹 1. Gerar Hash automaticamente
            String hashBlockchain = gerarHash(dto.detalhesAlteracao() + LocalDateTime.now());

            // 🔹 2. Registrar no Blockchain
            boolean sucesso = blockchainService.registrarNoBlockchain(dto.tabelaId(), hashBlockchain, dto.tipoAlteracao());

            if (sucesso) {
                // 🔹 3. Criar e salvar o registro na auditoria
                RegistroAuditoria registro = new RegistroAuditoria();
                registro.setEmpresa(empresa);
                registro.setTabelasSensiveis(tabela);
                registro.setOperador(operador);
                registro.setTipoAlteracao(dto.tipoAlteracao());
                registro.setDetalhesAlteracao(dto.detalhesAlteracao());
                registro.setHashBlockchain(hashBlockchain);

                return new RegistroAuditoriaResponseDTO(registroRepository.save(registro));
            } else {
                throw new RuntimeException("Erro ao registrar no Blockchain.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao processar o registro: " + e.getMessage());
        }
    }

    @Transactional
    public RegistroAuditoriaResponseDTO atualizarRegistroAuditoria(Long id, RegistroAuditoriaUpdateDTO dto) {
        RegistroAuditoria registro = registroRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Registro não encontrado."));

        try {
            // 🔹 1. Gerar novo Hash
            String hashBlockchain = gerarHash(dto.detalhesAlteracao() + LocalDateTime.now());

            // 🔹 2. Atualizar no Blockchain
            boolean sucesso = blockchainService.registrarNoBlockchain(id, hashBlockchain, dto.tipoAlteracao());

            if (sucesso) {
                // 🔹 3. Atualizar no Banco
                registro.setTipoAlteracao(dto.tipoAlteracao());
                registro.setDetalhesAlteracao(dto.detalhesAlteracao());
                registro.setHashBlockchain(hashBlockchain);

                return new RegistroAuditoriaResponseDTO(registroRepository.save(registro));
            } else {
                throw new RuntimeException("Erro ao atualizar no Blockchain.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Erro ao processar atualização: " + e.getMessage());
        }
    }

    @Transactional
    public void deletarRegistroAuditoria(Long id) {
        if (!registroRepository.existsById(id)) {
            throw new ResourceNotFoundException("Registro não encontrado.");
        }
        registroRepository.deleteById(id);
    }

    // 🔹 Método para gerar Hash SHA-256
    private String gerarHash(String input) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hashBytes = digest.digest(input.getBytes());
        StringBuilder hexString = new StringBuilder();
        for (byte b : hashBytes) {
            hexString.append(String.format("%02x", b));
        }
        return hexString.toString();
    }
}
