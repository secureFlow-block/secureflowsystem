package com.secureflow.secureflowsystem.service;

import com.secureflow.secureflowsystem.model.RegistroAuditoria;
import com.secureflow.secureflowsystem.repository.RegistroAuditoriaRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.hyperledger.fabric.gateway.*;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Service
public class BlockchainService {

    private final RegistroAuditoriaRepository registroAuditoriaRepository;

    @Value("${fabric.network.config}")
    private String networkConfigPath;

    @Value("${fabric.wallet.path}")
    private String walletPath;

    @Value("${fabric.user}")
    private String fabricUser;

    @Value("${fabric.channel}")
    private String fabricChannel;

    @Value("${fabric.chaincode}")
    private String fabricChaincode;

    private static final Logger logger = LoggerFactory.getLogger(BlockchainService.class);

    public BlockchainService(RegistroAuditoriaRepository registroAuditoriaRepository) {
        this.registroAuditoriaRepository = registroAuditoriaRepository;
    }

    /**
     * Obtém o hash do último bloco da blockchain armazenado no banco de dados.
     * @return O hash do último bloco, ou "Nenhum bloco encontrado" caso a blockchain esteja vazia.
     */
    public String obterUltimoHashBlockchain() {
        Optional<RegistroAuditoria> ultimoRegistro = registroAuditoriaRepository.findTopByOrderByIdDesc();
        return ultimoRegistro.map(RegistroAuditoria::getHashBlockchain).orElse("Nenhum bloco encontrado");
    }

    public RegistroAuditoria registrarNoBlockchain(RegistroAuditoria registro) {
        // Obtém o hash do último bloco
        String previousHash = obterUltimoHashBlockchain();

        // Gera o hash do novo bloco
        String hash = gerarHash(registro.toString() + previousHash);

        // Define o hash no registro
        registro.setHashBlockchain(hash);
        registro.setDataHora(LocalDateTime.now());

        // Salva no banco de dados
        registroAuditoriaRepository.save(registro);

        // Envia o bloco para a blockchain
        enviarParaBlockchain(registro);

        return registro;
    }

    private String gerarHash(String dados) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(dados.getBytes());
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                hexString.append(String.format("%02x", b));
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Erro ao gerar hash SHA-256", e);
        }
    }

    public void enviarParaBlockchain(RegistroAuditoria registro) {
        try {
            Path networkConfigFile = Paths.get(networkConfigPath);
            Wallet wallet = Wallets.newFileSystemWallet(Paths.get(walletPath));

            Gateway.Builder builder = Gateway.createBuilder()
                    .identity(wallet, fabricUser)
                    .networkConfig(networkConfigFile);

            try (Gateway gateway = builder.connect()) {
                Network network = gateway.getNetwork(fabricChannel);
                Contract contract = network.getContract(fabricChaincode);

                // Obtendo o hash do bloco anterior
                String previousHash = obterUltimoHashBlockchain();

                // Atualizando hash com referência ao anterior
                String blocoHash = gerarHash(registro.getHashBlockchain() + previousHash);
                registro.setHashBlockchain(blocoHash);

                contract.submitTransaction("RegistrarAlteracao",
                        registro.getId().toString(),
                        blocoHash,
                        previousHash,
                        registro.getDataHora().toString(),
                        registro.getTipoAlteracao());

                logger.info("Bloco enviado para a blockchain com sucesso! ID do Registro: {}", registro.getId());
            }
        } catch (Exception e) {
            logger.error("Erro ao enviar bloco para blockchain: ", e);
        }
    }

    public RegistroAuditoria registrarAlteracao(RegistroAuditoria registro) {
        return registrarNoBlockchain(registro);
    }
}
