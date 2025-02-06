package com.secureflow.secureflowsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Optional;

@Getter
@Setter
@AllArgsConstructor
public class UpdateAdministradorRequest {
    private Long id;
    private Optional<String> nome;
    private Optional<String>  email;
    private Optional<String> senha;
    private Optional<LocalDateTime> dataCriacao;
}
