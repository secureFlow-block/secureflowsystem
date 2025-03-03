package com.secureflow.secureflowsystem.service;

import com.secureflow.secureflowsystem.model.Blockchain;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;


@Service
public class BlockchainService {

    public Blockchain registrarNoBlockchain(Long registroId, String dados) {
        // Gera o hash do bloco
        String hash = gerarHash(dados);

        // Consulta o hash do bloco anterior
        buscarHashAnterior();

        // Cria o bloco
        Blockchain bloco = new Blockchain();
        bloco.setRegistroId(registroId);
        bloco.setHashBlockchain(hash);
        bloco.setDataRegistro(LocalDateTime.now());
        bloco.setStatus("Ativo");

        // Envia o bloco para o serviço de blockchain externo
        enviarParaBlockchain(bloco);

        return bloco;
    }

    private String gerarHash(String dados) {
        // Implementação de geração de hash (ex.: SHA-256)
        return "hash_calculado";
    }

    private String buscarHashAnterior() {
        // Busca o último hash registrado no serviço de blockchain
        return "hash_anterior";
    }

    private void enviarParaBlockchain(Blockchain bloco) {
        // Lógica para integrar com a API externa
    }
}
