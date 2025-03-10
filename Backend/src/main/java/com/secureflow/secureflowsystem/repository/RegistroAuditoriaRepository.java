package com.secureflow.secureflowsystem.repository;

import com.secureflow.secureflowsystem.model.RegistroAuditoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroAuditoriaRepository extends JpaRepository<RegistroAuditoria, Long> {
}
