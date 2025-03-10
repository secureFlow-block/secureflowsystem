package com.secureflow.secureflowsystem.controller;

import com.secureflow.secureflowsystem.dto.auth.AuthRequest;
import com.secureflow.secureflowsystem.dto.auth.AuthResponse;
import com.secureflow.secureflowsystem.security.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.senha())
        );

        UserDetails user = (UserDetails) authentication.getPrincipal();
        String token = tokenService.gerarToken(user.getUsername());

        return ResponseEntity.ok(new AuthResponse(token));
    }
}
