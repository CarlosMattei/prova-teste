package com.fatec.itu.prova_teste;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.fatec.itu.prova_teste.dtos.TaskResponse;
import com.fatec.itu.prova_teste.services.TaskService;

@SpringBootTest
class ProvaTesteApplicationTests {

	@Autowired
	private TaskService taskService;

	@Test
	void contextLoads() {
	}

	@Test
	void updatesTaskStatusAndKeepsOtherDetails() {
		TaskResponse original = taskService.findById(1L);

		taskService.updateStatus(1L, "EM ANDAMENTO");

		TaskResponse updated = taskService.findById(1L);
		assertEquals("EM ANDAMENTO", updated.status());
		assertEquals(original.title(), updated.title());
		assertEquals(original.description(), updated.description());
		assertEquals(original.responsible(), updated.responsible());
		assertEquals(original.priority(), updated.priority());
	}

}
