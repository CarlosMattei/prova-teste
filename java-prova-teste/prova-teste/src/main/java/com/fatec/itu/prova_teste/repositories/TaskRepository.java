package com.fatec.itu.prova_teste.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.itu.prova_teste.entities.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

    
} 