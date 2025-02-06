package com.secureflow.secureflowsystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ADMINISTRADOR")
public class Administrador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ADMIN_ID")
    private Long adminId;
    @Column(name="NOME",nullable = false)
    private String nome;
    @Column(name="EMAIL",nullable = false, unique = true)
    private String email;
    @Column(name="SENHA",nullable = false)
    private String senha;
    @Column(name= "DATA_CRIACAO",nullable = false)
    private LocalDateTime dataCriacao=LocalDateTime.now();

}
