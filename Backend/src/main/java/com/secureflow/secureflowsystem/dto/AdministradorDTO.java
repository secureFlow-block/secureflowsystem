package com.secureflow.secureflowsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class AdministradorDTO {
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private LocalDateTime dataCriacao;
}
