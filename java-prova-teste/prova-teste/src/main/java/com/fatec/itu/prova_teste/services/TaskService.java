package com.fatec.itu.prova_teste.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fatec.itu.prova_teste.dtos.TaskResponse;
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

}
