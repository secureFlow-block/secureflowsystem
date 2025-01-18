package com.secureflow.secureflowsystem.service;

import com.secureflow.secureflowsystem.dto.AdministradorDTO;
import com.secureflow.secureflowsystem.dto.UpdateAdministradorRequest;
import com.secureflow.secureflowsystem.model.Administrador;
import com.secureflow.secureflowsystem.repository.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdministradorService {
    @Autowired
    private AdministradorRepository administradorRepository;

    public List<AdministradorDTO> getAll(){
        return administradorRepository.findAll().stream()
                .map(administrador -> new AdministradorDTO(
                        administrador.getAdminId(),
                        administrador.getNome(),
                        administrador.getEmail(),
                        administrador.getSenha(),
                        administrador.getDataCriacao()
                )).collect(Collectors.toList());
    }

    public Optional<AdministradorDTO> getById(Long adminId){
        return administradorRepository.findById(adminId)
                .map(administrador -> new AdministradorDTO(
                        administrador.getAdminId(),
                        administrador.getNome(),
                        administrador.getEmail(),
                        administrador.getSenha(),

                        administrador.getDataCriacao()
                ));

    }
    public Optional<AdministradorDTO> updateAdministrador(UpdateAdministradorRequest request) {
        return administradorRepository.findById(request.getId())
                .map(administrador -> {
                    request.getNome().ifPresent(administrador::setNome);
                    request.getEmail().ifPresent(administrador::setEmail);
                   request.getSenha().ifPresent(administrador::setSenha);
                   request.getDataCriacao().ifPresent(administrador::setDataCriacao);
                    administradorRepository.save(administrador);
                    return new AdministradorDTO(
                            administrador.getAdminId(),
                            administrador.getNome(),
                            administrador.getEmail(),
                            administrador.getSenha(),
                            administrador.getDataCriacao()
                    );
                });
    }

    public Administrador criarAdminstrador(Administrador administrador) {
        return administradorRepository.save(administrador);
    }
    public void deleteAdmistrador(Long adminId){
        administradorRepository.deleteById(adminId);
    }
}
