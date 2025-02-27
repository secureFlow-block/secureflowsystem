package com.secureflow.secureflowsystem.repository;

import com.secureflow.secureflowsystem.model.RegistroAuditoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RegistroAuditoriaRepository extends JpaRepository<RegistroAuditoria, Long> {

    // Método para obter o último registro de auditoria baseado no ID (ordem decrescente)
    Optional<RegistroAuditoria> findTopByOrderByIdDesc();

}
