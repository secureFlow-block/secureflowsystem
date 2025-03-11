package com.secureflow.secureflowsystem.service;

import com.secureflow.secureflowsystem.model.Blockchain;
import com.secureflow.secureflowsystem.repository.BlockchainRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlockchainService {

    private final BlockchainRepository blockchainRepository;

    @Transactional
    public boolean registrarNoBlockchain(Long registroId, String hashBlockchain, String tipoAlteracao) {
        System.out.println("🔗 Registrando no Blockchain...");

        // 🔹 Obtendo o hash do bloco anterior
        String hashAnterior = buscarHashAnterior();

        // 🔹 Criando o novo bloco
        Blockchain bloco = new Blockchain();
        bloco.setRegistroId(registroId);
        bloco.setHashBlockchain(hashBlockchain);
        bloco.setDataRegistro(LocalDateTime.now());
        bloco.setStatus("Ativo");

        // 🔹 Salvando no banco de dados
        blockchainRepository.save(bloco);
        
        System.out.println("✅ Bloco registrado no Blockchain com hash: " + hashBlockchain);
        return true;
    }

    private String buscarHashAnterior() {
        Optional<Blockchain> ultimoBloco = blockchainRepository.findTopByOrderByBlockchainIdDesc();
        return ultimoBloco.map(Blockchain::getHashBlockchain).orElse("GENESIS");
    }
}
