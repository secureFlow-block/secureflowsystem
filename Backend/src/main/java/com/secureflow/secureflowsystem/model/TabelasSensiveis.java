package com.secureflow.secureflowsystem.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "tabelaId")
public class TabelasSensiveis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tabelaId;

    @Column(nullable = false, length = 100)
    private String nomeTabela;

    private LocalDateTime dataDefinicao = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;
}
