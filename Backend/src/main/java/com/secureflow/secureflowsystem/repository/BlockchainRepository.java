package com.secureflow.secureflowsystem.repository;

import com.secureflow.secureflowsystem.model.Blockchain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BlockchainRepository extends JpaRepository<Blockchain, Long> {
    
    // Método existente
    Blockchain findByRegistroId(Long registroId);

    // Novo método para obter o último bloco registrado na blockchain
    Optional<Blockchain> findTopByOrderByBlockchainIdDesc();
}
