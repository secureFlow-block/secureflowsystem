package com.secureflow.secureflowsystem.repository;

import com.secureflow.secureflowsystem.model.TabelasSensiveis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TabelasSensiveisRepository extends JpaRepository<TabelasSensiveis, Long> {

    boolean existsByNomeTabela(String nomeTabela);

    @Query(value = "SELECT * FROM tabelas_sensiveis WHERE empresa_id = :empresaId", nativeQuery = true)
    List<TabelasSensiveis> buscarTabelasPorEmpresa(@Param("empresaId") Long empresaId);

    @Query(value = "SELECT * FROM tabelas_sensiveis WHERE empresa_id = :empresaId AND tabela_id = :tabelaId", nativeQuery = true)
    Optional<TabelasSensiveis> buscarTabelaPorId(@Param("empresaId") Long empresaId, @Param("tabelaId") Long tabelaId);
}
