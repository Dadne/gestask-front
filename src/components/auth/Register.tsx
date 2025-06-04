import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import PasswordTextField from "../generic/PasswordTextField";
import isEmail from "validator/lib/isEmail";
import isAlpha from "validator/lib/isAlpha";
import { registerUser } from "../../services/AppServices";
import useLogin from "../../hooks/useLogin";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorName, setErrorName] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn } = useLogin();

  const handleRegister = async () => {
    if (!email || !name || !password || !confirmPassword) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    registerUser({ email, name, password, confirmPassword })
      .then((response) => {
        alert("Registro exitoso");
        signIn(email, password)
          .then(() => {
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      })
      .catch((error) => {
        alert("Error al registrarse. Por favor, inténtalo de nuevo.");
        console.error("Error al registrar", error);
      });
  };

  const handleEmailChange = (event: any) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    if (!isEmail(newEmail) && newEmail !== "") {
      setErrorEmail("Introduce un correo electrónico válido.");
      return;
    } else {
      setErrorEmail("");
      return;
    }
  };

  const handleNameChange = (event: any) => {
    const newName = event.target.value;
    setName(newName);

    if (!isAlpha(newName, "es-ES", { ignore: " " }) && newName !== "") {
      setErrorName("Introduce un nombre válido.");
      return;
    } else {
      setErrorName("");
      return;
    }
  };

  useEffect(() => {
    if (password === confirmPassword) setErrorPassword("");

    if (confirmPassword && password !== confirmPassword) {
      setErrorPassword("Las contraseñas no coinciden.");
    } else {
      setErrorPassword("");
    }
  }, [confirmPassword]);

  return (
    <Box>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Registro
      </Typography>

      <TextField
        label="Nombre"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => handleNameChange(e)}
        helperText={errorName}
        error={!!errorName}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Correo electrónico"
        type="email"
        margin="normal"
        value={email}
        onChange={handleEmailChange}
        helperText={errorEmail}
        error={!!errorEmail}
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />

      <PasswordTextField
        label="Password"
        fullWidth
        margin="normal"
        value={password}
        setData={setPassword}
        sx={{ mb: 2 }}
      />

      <PasswordTextField
        label="Confirmar Password"
        fullWidth
        margin="normal"
        value={confirmPassword}
        setData={setConfirmPassword}
        sx={{ mb: 2 }}
        error={errorPassword}
      />
      <Button
        variant="contained"
        fullWidth
        size="large"
        sx={{
          backgroundColor: "#212121",
          color: "white",
          "&:hover": {
            backgroundColor: "#424242",
          },
          textTransform: "none",
          borderRadius: "8px",
          py: 1.5,
        }}
        onClick={handleRegister}
      >
        Registrarse
      </Button>
    </Box>
  );
};

export default RegisterForm;
