package com.fatec.itu.prova_teste.mappers;


import com.fatec.itu.prova_teste.dtos.TaskRequest;
import com.fatec.itu.prova_teste.dtos.TaskResponse;

import com.fatec.itu.prova_teste.entities.Task;

public class TaskMapper {
    
 public static Task toEntity(TaskRequest request){
            Task t = new Task();
            t.setTitle(request.title());
            t.setDescription(request.description());
            t.setResponsible(request.responsible());
            t.setStatus(request.status());
            t.setPriority(request.priority());


            return t;
    }
 
    public static TaskResponse toDTO(Task task)
    {
        return new TaskResponse(
            task.getId(),
            task.getTitle(),
            task.getDescription(),
            task.getResponsible(),
            task.getStatus(),
            task.getPriority()

        );
    }
}
