package com.fatec.itu.prova_teste.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;

@Entity 
@Table (name = "TBL_TASK")
public class Task implements java.io.Serializable {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    //Atributos
    private Long id;
    private String title;
    private String responsible;
    private String status;
    private String priority;

}
