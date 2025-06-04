import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/AppServices";

const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    loginUser(email, password)
      .then((response) => {
        const token = response.token;
        if (token) {
          login(token);
          navigate("/tasks");
        } else {
          alert("No se recibió un token de la API.");
        }
      })
      .catch((err) => {
        console.error("Error de autenticación:", err);
        alert(err.message || "Credenciales inválidas. Intenta de nuevo.");
      });
  };

  return { signIn };
};

export default useLogin;
