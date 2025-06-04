import axios, { AxiosInstance } from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const apiService: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const assignTask = async (
  taskId: string,
  assignedTo: string,
  token: any
) => {
  try {
    const response = await apiService.put(
      `/tasks/${taskId}/assign`,
      {
        assignedTo,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error en assignTask:", error);
    throw error;
  }
};

export const completeTask = async (taskId: string, token: any) => {
  try {
    const response = await apiService.put(
      `/tasks/${taskId}/complete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error en completeTask:", error);
    throw error;
  }
};

export const createTask = async (
  title: string,
  description: string,
  assignedTo: string,
  token: any
) => {
  console.log(token);
  try {
    const response = await apiService.post(
      "/tasks",
      {
        title,
        description,
        assignedTo,
        expirationDate: "2026-03-21T16:40:27.408Z",

      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error en createTask:", error);
    throw error;
  }
};

export const getUsersList = async (token: any) => {
  try {
    const response = await apiService.get(`/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getUsersList:", error);
    throw error;
  }
};

export const getTasksList = async (token: any) => {
  try {
    const response = await apiService.get("/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Executed", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en getTasks:", error);
    throw error;
  }
};

export const registerUser = async (data: any) => {
  try {
    const response = await apiService.post("/auth/register", {
      ...data,
    });
    return response.data;
  } catch (error) {
    console.error("Error en registerUser:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiService.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Error en loginUser:", error);
    throw error;
  }
};
