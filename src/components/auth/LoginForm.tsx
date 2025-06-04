import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import PasswordTextField from "../generic/PasswordTextField";
import useLogin from "../../hooks/useLogin";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("hello@gmail.com");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn } = useLogin();

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    signIn(email, password)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <Box>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Iniciar sesión
      </Typography>

      <TextField
        label="Correo electrónico"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />

      <PasswordTextField
        label="Contraseña"
        fullWidth
        margin="normal"
        value={password}
        setData={setPassword}
        sx={{ mb: 2 }}
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
        onClick={handleSignIn}
        disabled={loading}
      >
        Iniciar sesión
      </Button>
    </Box>
  );
};

export default LoginForm;
