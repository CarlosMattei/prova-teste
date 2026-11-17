package com.fatec.itu.prova_teste.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record TaskRequest(

        @NotBlank(message = "Título da tarefa é obrigatório") 
        String title,

        String description,

        @NotBlank(message = "Responsável da tarefa é obrigatório") 
        String responsible,

        @NotBlank(message = "Status da tarefa é obrigatório") 
        @Pattern(regexp = "PENDENTE|EM_ANDAMENTO|CONCLUIDA", message = "Status deve ser PENDENTE, EM_ANDAMENTO ou CONCLUIDA") 
        String status,

        @NotBlank(message = "Prioridade da tarefa é obrigatória") 
        @Pattern(regexp = "BAIXA|MEDIA|ALTA", message = "Prioridade deve ser BAIXA, MEDIA ou ALTA") 
        String priority

) {

}
