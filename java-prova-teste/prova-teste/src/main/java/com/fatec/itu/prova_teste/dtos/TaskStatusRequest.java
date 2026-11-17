package com.fatec.itu.prova_teste.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record TaskStatusRequest(
    @NotBlank
    @Pattern(regexp = "PENDENTE|EM ANDAMENTO|CONCLUIDA")
    String status
) {}
