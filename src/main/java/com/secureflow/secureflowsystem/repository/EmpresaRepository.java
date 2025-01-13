package com.secureflow.secureflowsystem.repository;
import com.secureflow.secureflowsystem.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;



public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
    // Métodos personalizados, se necessário
}
