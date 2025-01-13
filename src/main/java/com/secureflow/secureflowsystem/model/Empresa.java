package com.secureflow.secureflowsystem.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long empresaId;

    @Column(nullable = false, unique = true)
    private String nome;

    @Column(nullable = false, unique = true, length = 14)
    private String cnpj;

    private LocalDateTime dataCadastro = LocalDateTime.now();



    
    public Empresa() {
    }

    

    public Empresa(Long empresaId, String nome, String cnpj, LocalDateTime dataCadastro) {
        this.empresaId = empresaId;
        this.nome = nome;
        this.cnpj = cnpj;
        this.dataCadastro = dataCadastro;
    }



    public Long getEmpresaId() {
        return empresaId;
    }

    public void setEmpresaId(Long empresaId) {
        this.empresaId = empresaId;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

}
