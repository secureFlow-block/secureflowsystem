package com.secureflow.secureflowsystem.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Blockchain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long blockchainId; // Identificador único do bloco

    @Column(nullable = false)
    private Long registroId; // Referência ao registro de auditoria

    @Column(nullable = false, unique = true)
    private String hashBlockchain; // Hash gerado para o bloco

    @Column(nullable = false)
    private LocalDateTime dataRegistro; // Data e hora do registro do bloco

    @Column(nullable = false)
    private String status; // Status do bloco (ex.: ativo, processado)

    // Construtor padrão
    public Blockchain() {
    }

    // Construtor completo
    public Blockchain(Long registroId, String hashBlockchain, LocalDateTime dataRegistro, String status) {
        this.registroId = registroId;
        this.hashBlockchain = hashBlockchain;
        this.dataRegistro = dataRegistro;
        this.status = status;
    }

    // Getters e Setters
    public Long getBlockchainId() {
        return blockchainId;
    }

    public void setBlockchainId(Long blockchainId) {
        this.blockchainId = blockchainId;
    }

    public Long getRegistroId() {
        return registroId;
    }

    public void setRegistroId(Long registroId) {
        this.registroId = registroId;
    }

    public String getHashBlockchain() {
        return hashBlockchain;
    }

    public void setHashBlockchain(String hashBlockchain) {
        this.hashBlockchain = hashBlockchain;
    }

    public LocalDateTime getDataRegistro() {
        return dataRegistro;
    }

    public void setDataRegistro(LocalDateTime dataRegistro) {
        this.dataRegistro = dataRegistro;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void registrarBloco(Long registroId, String dados, String previousHash) {
        this.registroId = registroId;
        this.dataRegistro = LocalDateTime.now(); // Define o timestamp
        this.hashBlockchain = gerarHash(dados, previousHash); // Gera o hash para o bloco
        this.status = "Ativo"; // Define o status do bloco como ativo
    }

    public boolean validarBloco(String previousHash) {
        String hashCalculado = gerarHash(this.dataRegistro.toString(), previousHash);
        return this.hashBlockchain.equals(hashCalculado); // Verifica se o hash é válido
    }

    private String gerarHash(String dados, String previousHash) {
        // Implementação simplificada para gerar um hash
        return String.valueOf((dados + previousHash).hashCode());
    }
    
}
