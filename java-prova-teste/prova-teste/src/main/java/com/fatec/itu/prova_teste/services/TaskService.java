package com.fatec.itu.prova_teste.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    

    public List<TaskResponse> findAll(){
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

    public TaskResponse save(TaskRequest task)
    {
        Task t = repository.save(TaskMapper.toEntity(task));
         return TaskMapper.toDTO(t);
    }

    public TaskResponse updateStatus(Long id, TaskStatusRequest request) {
      Task task = repository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "Tarefa não encontrada"
        ));

      task.setStatus(request.status());
      Task updatedTask = repository.save(task);
      return TaskMapper.toDTO(updatedTask);
    }

     public void deleteById(long id) {
      if(repository.existsById(id))
            repository.deleteById(id);
        else
           throw new EntityNotFoundException("Tarefa não cadastrada");
    }
}
