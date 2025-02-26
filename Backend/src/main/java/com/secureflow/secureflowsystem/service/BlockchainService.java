package com.secureflow.secureflowsystem.service;

import com.secureflow.secureflowsystem.model.RegistroAuditoria;
import com.secureflow.secureflowsystem.model.Blockchain;
import com.secureflow.secureflowsystem.repository.BlockchainRepository;
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

    private final BlockchainRepository blockchainRepository;
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

    public BlockchainService(BlockchainRepository blockchainRepository, RegistroAuditoriaRepository registroAuditoriaRepository) {
        this.blockchainRepository = blockchainRepository;
        this.registroAuditoriaRepository = registroAuditoriaRepository;
    }

    /**
     * Obtém o hash do último bloco da blockchain armazenado no banco de dados.
     * @return O hash do último bloco, ou "Nenhum bloco encontrado" caso a blockchain esteja vazia.
     */
    public String obterUltimoHashBlockchain() {
        Optional<Blockchain> ultimoBloco = blockchainRepository.findTopByOrderByBlockchainIdDesc();
        return ultimoBloco.map(Blockchain::getHashBlockchain).orElse("Nenhum bloco encontrado");
    }

    public Blockchain registrarNoBlockchain(Long registroId, String dados) {
        // Obtém o hash do último bloco
        String previousHash = obterUltimoHashBlockchain();

        // Gera o hash do novo bloco
        String hash = gerarHash(dados + previousHash);

        // Cria o bloco com referência ao anterior
        Blockchain bloco = new Blockchain(registroId, hash, LocalDateTime.now(), "Ativo");

        // Salva no banco de dados antes de enviar ao blockchain
        blockchainRepository.save(bloco);

        // Envia o bloco para o blockchain
        enviarParaBlockchain(bloco);

        return bloco;
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

    public void enviarParaBlockchain(Blockchain bloco) {
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
                String blocoHash = gerarHash(bloco.getHashBlockchain() + previousHash);
                bloco.setHashBlockchain(blocoHash);

                contract.submitTransaction("RegistrarAlteracao",
                        bloco.getRegistroId().toString(),
                        blocoHash,
                        previousHash,
                        bloco.getDataRegistro().toString(),
                        bloco.getStatus());

                logger.info("Bloco enviado para a blockchain com sucesso! ID do Registro: {}", bloco.getRegistroId());
            }
        } catch (Exception e) {
            logger.error("Erro ao enviar bloco para blockchain: ", e);
        }
    }

    public void registrarAlteracao(RegistroAuditoria registro) {
        // Salvar no banco de dados primeiro
        registroAuditoriaRepository.save(registro);

        // Criar um novo bloco para registrar a alteração na blockchain
        registrarNoBlockchain(registro.getId(), registro.toString());
    }
}
