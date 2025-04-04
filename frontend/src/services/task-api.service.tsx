import axios from "axios";
import { Task } from "../pages/main";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

const getHeaders = () => {
  return {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
};

export const getAllTasks = async (filters: {
  pageSize: number;
  page: number;
}) => {
  try {
    const response = await api.get("/task", {
      params: filters,
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};

export const createTask = async (body: {
  title: string;
  description: string;
}) => {
  try {
    const response = await api.post("/task", body, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
};

export const updateTask = async (task: Task) => {
  try {
    const response = await api.put(`/task/${task.id}`, task, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
};

export const deleteTask = async (taskId: number) => {
  try {
    const response = await api.delete(`/task/${taskId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    throw error;
  }
};

export const completeTask = async (taskId: number) => {
  try {
    const response = await api.put(
      `/task/${taskId}/done`,
      {},
      {
        headers: getHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
};
