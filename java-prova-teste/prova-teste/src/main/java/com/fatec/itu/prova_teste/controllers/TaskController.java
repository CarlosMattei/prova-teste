package com.fatec.itu.prova_teste.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.itu.prova_teste.dtos.TaskResponse;
import com.fatec.itu.prova_teste.services.TaskService;

@RestController 
@CrossOrigin 
@RequestMapping ("/tasks")
public class TaskController {

    @Autowired  
    private TaskService service;


    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAll() {
        return ResponseEntity.ok(service.findAll()); 
    }                                           

    @GetMapping("{id}")
    public ResponseEntity<TaskResponse> getById(@PathVariable long id){ 
        return ResponseEntity.ok(service.findById(id));
    }
}