package com.secureflow.secureflowsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.secureflow.secureflowsystem.model.Empresa;
import com.secureflow.secureflowsystem.repository.EmpresaRepository;

import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SecureflowsystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecureflowsystemApplication.class, args);

	}

	@Bean
	CommandLineRunner initDatabase(EmpresaRepository empresaRepository) {
		return args -> {
			empresaRepository.save(
					new Empresa(1L, "Empresa1", "1253125dd", LocalDateTime.of(2024, 1, 13, 0, 0)));
		};
	}

}
