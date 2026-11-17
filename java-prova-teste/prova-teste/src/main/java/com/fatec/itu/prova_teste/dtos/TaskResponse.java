package com.fatec.itu.prova_teste.dtos;

public record TaskResponse(
    Long id,
    String title,
    String description,
    String responsible,
    String status,
    String priority
){}
