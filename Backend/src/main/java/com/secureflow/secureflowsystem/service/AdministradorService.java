package com.secureflow.secureflowsystem.service;

import com.secureflow.secureflowsystem.dto.AdministradorDTO;
import com.secureflow.secureflowsystem.dto.UpdateAdministradorRequest;
import com.secureflow.secureflowsystem.exception.EmailAlreadyExistsException;
import com.secureflow.secureflowsystem.exception.SenhaInvalidaException;
import com.secureflow.secureflowsystem.model.Administrador;
import com.secureflow.secureflowsystem.repository.AdministradorRepository;
import com.secureflow.secureflowsystem.utils.SenhaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdministradorService {
    @Autowired
    private AdministradorRepository administradorRepository;
    @Autowired
    private PasswordHashService passwordHashService;

    public List<AdministradorDTO> getAll(){
        return this.administradorRepository.findAll().stream()
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

    public void criarAdministrador(Administrador administrador) throws EmailAlreadyExistsException, SenhaInvalidaException {
        SenhaUtils.validarSenha(administrador.getSenha());
        if (administradorRepository.existsByEmail(administrador.getEmail())) {
            throw new EmailAlreadyExistsException("Este e-mail já está cadastrado.");
        }
        String hashedPassword = passwordHashService.hashPassword(administrador.getSenha());
        administrador.setSenha(hashedPassword);
        administradorRepository.save(administrador);
    }
    public void deleteAdministrador(Long adminId){
        administradorRepository.deleteById(adminId);
    }
}
