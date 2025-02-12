package com.secureflow.secureflowsystem.repository;

import com.secureflow.secureflowsystem.model.Operador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OperadorRepository extends JpaRepository<Operador, Long> {

    boolean existsByEmail(String email);

    @Query(value = "SELECT COUNT(*) > 0 FROM operador WHERE email = :email AND operador_id <> :id", nativeQuery = true)
    boolean existsByEmailAndNotId(@Param("email") String email, @Param("id") Long id);
}
