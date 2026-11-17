package com.fatec.itu.prova_teste.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record TaskStatusRequest(
    @NotBlank(message = "Status da tarefa é obrigatório")
    @Pattern(
        regexp = "PENDENTE|EM ANDAMENTO|CONCLUIDA",
        message = "Status deve ser PENDENTE, EM ANDAMENTO ou CONCLUIDA"
    )
    String status
) {
}