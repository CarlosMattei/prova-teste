package com.fatec.itu.prova_teste.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fatec.itu.prova_teste.dtos.TaskRequest;
import com.fatec.itu.prova_teste.dtos.TaskResponse;
import com.fatec.itu.prova_teste.dtos.TaskStatusRequest;
import com.fatec.itu.prova_teste.entities.Task;
import com.fatec.itu.prova_teste.mappers.TaskMapper;
import com.fatec.itu.prova_teste.repositories.TaskRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TaskService {
  @Autowired
  private TaskRepository repository;

  public List<TaskResponse> findAll() {
    return repository.findAll()
        .stream()
        .map(TaskMapper::toDTO)
        .toList();
  }

  public TaskResponse findById(Long id) {
    return repository.findById(id) // Devolve UM OBJETO PRODUTO
                         .map(TaskMapper::toDTO)
                         .orElseThrow(() -> new EntityNotFoundException()); // trata exceção/erro
    }

    public TaskResponse updateStatus(Long id, String status) {
      var task = repository.findById(id)
                           .orElseThrow(() -> new EntityNotFoundException());
      task.setStatus(status);
      return TaskMapper.toDTO(repository.save(task));
    }
}
