import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createUser = async (body: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post("/user", {
      ...body,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
};

export const login = async (body: { username: string; password: string }) => {
  try {
    const response = await api.post("/login", {
      ...body,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
};
