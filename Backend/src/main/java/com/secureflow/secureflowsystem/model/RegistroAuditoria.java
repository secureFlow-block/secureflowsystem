package com.secureflow.secureflowsystem.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "RegistroAuditoria")
public class RegistroAuditoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RegistroID")
    private Long id;

    @Column(name = "EmpresaID", nullable = false)
    private Integer empresaId;

    @Column(name = "TabelaID", nullable = false)
    private Integer tabelaId;

    @Column(name = "OperadorID", nullable = false)
    private Integer operadorId;

    @Column(name = "TipoAlteracao", nullable = false)
    private String tipoAlteracao;

    @Column(name = "DetalhesAlteracao", nullable = false)
    private String detalhesAlteracao; // Aqui os dados serão armazenados criptografados.

    @Column(name = "DataHora", nullable = false)
    private LocalDateTime dataHora;

    @Column(name = "HashBlockchain", nullable = false)
    private String hashBlockchain;

    public RegistroAuditoria() {
        this.dataHora = LocalDateTime.now();
    }

    public RegistroAuditoria(Integer empresaId, Integer tabelaId, Integer operadorId, String tipoAlteracao, String detalhesAlteracao, String hashBlockchain) {
        this.empresaId = empresaId;
        this.tabelaId = tabelaId;
        this.operadorId = operadorId;
        this.tipoAlteracao = tipoAlteracao;
        this.detalhesAlteracao = detalhesAlteracao;
        this.dataHora = LocalDateTime.now();
        this.hashBlockchain = hashBlockchain;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public Integer getEmpresaId() { return empresaId; }
    public Integer getTabelaId() { return tabelaId; }
    public Integer getOperadorId() { return operadorId; }
    public String getTipoAlteracao() { return tipoAlteracao; }
    public String getDetalhesAlteracao() { return detalhesAlteracao; }
    public LocalDateTime getDataHora() { return dataHora; }
    public String getHashBlockchain() { return hashBlockchain; }

    public void setId(Long id) { this.id = id; }
    public void setEmpresaId(Integer empresaId) { this.empresaId = empresaId; }
    public void setTabelaId(Integer tabelaId) { this.tabelaId = tabelaId; }
    public void setOperadorId(Integer operadorId) { this.operadorId = operadorId; }
    public void setTipoAlteracao(String tipoAlteracao) { this.tipoAlteracao = tipoAlteracao; }
    public void setDetalhesAlteracao(String detalhesAlteracao) { this.detalhesAlteracao = detalhesAlteracao; }
    public void setDataHora(LocalDateTime dataHora) { this.dataHora = dataHora; }
    public void setHashBlockchain(String hashBlockchain) { this.hashBlockchain = hashBlockchain; }
}

