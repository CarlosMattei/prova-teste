import axios from "axios";
import { Task } from "../models/tasks";

const TASKS_API_URL = "http://localhost:8080/tasks";

export async function fetchTasks(): Promise<Task[]> {
  try {
    const response = await axios.get<Task[]>(TASKS_API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    throw error;
  }
}

// TODO (Integração Backend - Tela de Detalhes):
// Implementar função para buscar uma única tarefa por ID para usar em `src/app/detailsScreen.tsx`:
// export async function fetchTaskById(id: string | number): Promise<Task> {
//   const response = await axios.get<Task>(`${TASKS_API_URL}/${id}`);
//   return response.data;
// }
