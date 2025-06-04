import axios, {
  AxiosInstance,
} from "axios";

const API_BASE_URL =
  process.env.API_URL || "http://localhost:3001/api";

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
