package com.secureflow.secureflowsystem.repository;

import com.secureflow.secureflowsystem.model.Blockchain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlockchainRepository extends JpaRepository<Blockchain, Long> {
    Blockchain findByRegistroId(Long registroId);
}
