package com.secureflow.secureflowsystem.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "operadorId")
public class Operador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "operadorid") // Ajuste para o nome correto no banco
    private Long operadorId;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 100)
    private String cargo;

    @ManyToOne
@JoinColumn(name = "empresaid", nullable = false) // Nome correto da coluna no banco
private Empresa empresa;
}
