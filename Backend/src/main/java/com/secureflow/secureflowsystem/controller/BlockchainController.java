package com.secureflow.secureflowsystem.controller;

import com.secureflow.secureflowsystem.model.Blockchain;
import com.secureflow.secureflowsystem.repository.BlockchainRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/blockchain")
public class BlockchainController {

    private final BlockchainRepository blockchainRepository;

    public BlockchainController(BlockchainRepository blockchainRepository) {
        this.blockchainRepository = blockchainRepository;
    }

    @GetMapping
    public ResponseEntity<List<Blockchain>> listarBlockchain() {
        return ResponseEntity.ok(blockchainRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blockchain> buscarBlockchainPorId(@PathVariable Long id) {
        return blockchainRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
