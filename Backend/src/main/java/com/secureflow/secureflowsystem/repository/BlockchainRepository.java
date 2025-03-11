package com.secureflow.secureflowsystem.repository;

import com.secureflow.secureflowsystem.model.Blockchain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BlockchainRepository extends JpaRepository<Blockchain, Long> {
    
    /**
     * Busca um registro específico da blockchain associado a um ID de auditoria.
     * 
     * @param registroId O ID do registro de auditoria associado.
     * @return O bloco correspondente na blockchain.
     */
    Optional<Blockchain> findByRegistroId(Long registroId);

    /**
     * Obtém o último bloco registrado na blockchain com base no ID mais alto.
     * 
     * @return O bloco mais recente registrado.
     */
    Optional<Blockchain> findTopByOrderByBlockchainIdDesc();
}
