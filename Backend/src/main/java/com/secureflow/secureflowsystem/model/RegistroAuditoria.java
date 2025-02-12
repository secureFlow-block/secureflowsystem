package com.secureflow.secureflowsystem.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "registroId")
public class RegistroAuditoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long registroId;

    @Column(nullable = false, length = 10)
    private String tipoAlteracao;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String detalhesAlteracao;

    private LocalDateTime dataHora = LocalDateTime.now();

    @Column(nullable = false)
    private String hashBlockchain;

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    private Empresa empresa;

    @ManyToOne
    @JoinColumn(name = "tabela_id", nullable = false)
    private TabelasSensiveis tabelasSensiveis;

    @ManyToOne
    @JoinColumn(name = "operador_id", nullable = false)
    private Operador operador;
}
