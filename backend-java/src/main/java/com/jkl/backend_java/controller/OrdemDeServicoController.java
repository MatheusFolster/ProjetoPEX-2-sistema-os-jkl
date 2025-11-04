package com.jkl.backend_java.controller;

import com.jkl.backend_java.model.Cliente;
import com.jkl.backend_java.model.OrdemDeServico;
import com.jkl.backend_java.repository.ClienteRepository;
import com.jkl.backend_java.repository.OrdemDeServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/ordens-servico")
public class OrdemDeServicoController {

    @Autowired
    private OrdemDeServicoRepository osRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    // Endpoint para criar uma nova Ordem de Serviço para um Cliente específico
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrdemDeServico criar(@RequestBody OrdemDeServico os) {
        // Validação simples para garantir que o cliente existe
        clienteRepository.findById(os.getCliente().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cliente não encontrado."));

        os.setStatus("ABERTO");
        os.setDataAbertura(LocalDateTime.now());
        return osRepository.save(os);
    }

    // Endpoint para listar todas as Ordens de Serviço
    @GetMapping
    public List<OrdemDeServico> listarTodas() {
        return osRepository.findAll();
    }
}
