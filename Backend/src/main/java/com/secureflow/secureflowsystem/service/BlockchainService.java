package com.secureflow.secureflowsystem.service;
import com.secureflow.secureflowsystem.model.RegistroAuditoria;
import com.secureflow.secureflowsystem.model.Blockchain;
import com.secureflow.secureflowsystem.repository.BlockchainRepository;
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

@Service
public class BlockchainService {

    private final BlockchainRepository blockchainRepository;

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

    public BlockchainService(BlockchainRepository blockchainRepository) {
        this.blockchainRepository = blockchainRepository;
    }

    public Blockchain registrarNoBlockchain(Long registroId, String dados) {
        // Gera o hash do bloco
        String hash = gerarHash(dados);

        // Cria o bloco
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
    Logger logger = LoggerFactory.getLogger(BlockchainService.class);
    
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

    // Enviar o hash para a blockchain
    enviarParaBlockchain(registro);
}


}
