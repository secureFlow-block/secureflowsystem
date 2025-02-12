package com.secureflow.secureflowsystem.repository;

import com.secureflow.secureflowsystem.model.TabelasSensiveis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TabelasSensiveisRepository extends JpaRepository<TabelasSensiveis, Long> {

    boolean existsByNomeTabela(String nomeTabela);

    @Query(value = "SELECT COUNT(*) > 0 FROM tabelas_sensiveis WHERE nome_tabela = :nomeTabela AND tabela_id <> :id", nativeQuery = true)
    boolean existsByNomeTabelaAndNotId(@Param("nomeTabela") String nomeTabela, @Param("id") Long id);
}
