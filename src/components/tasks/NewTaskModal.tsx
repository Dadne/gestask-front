// src/components/NewTaskModal.tsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import {  createTask, getUsersList } from "../../services/AppServices";
import { useAuth } from "../../context/AuthContext";

interface User {
  _id: string;
  name: string;
}

interface NewTaskModalProps {
  open: boolean;
  onClose: () => void;
  setRefresh: (refresh: boolean) => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({
  open,
  onClose,
  setRefresh,
}) => {
  const { token } = useAuth();
  const [assignedTo, setAssignedTo] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [assignedToError, setAssignedToError] = useState<boolean>(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [usersList, setUsersList] = useState<User[]>([]);

  const getUsers = async () => {
    getUsersList(token)
      .then(({ data }) => {
        const users = data;
        console.log("Users data:", users);
        setUsersList(users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    if (open) {
      setAssignedTo("");
      setAssignedToError(false);
      getUsers();
    }
  }, [open]);

  useEffect(() => {
    setIsSubmitDisabled(assignedTo.trim() === "");
  }, [assignedTo]);

  const handleAssignedToChange = (event: any) => {
    setAssignedTo(event.target.value as string);
    if (event.target.value.trim() !== "") {
      setAssignedToError(false);
    }
  };

  const handleSubmit = () => {
    console.log(assignedTo && description && title)
    if (assignedTo && description && title) {
      createTask(title, description, assignedTo, token)
        .then(() => {

          handleClose();
          alert("Tarea creada correctamente.");
          setRefresh(true);


        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Eror al crear la tarea. Por favor, inténtalo de nuevo más tarde.");
          handleClose();
        });
    }else{
      setAssignedToError(true);
      alert("Completa todos los campos requeridos.");
    }
  };

  const handleClose = () => {
    setAssignedTo("");
    setAssignedToError(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Nueva Tarea</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          noValidate
        >
          <TextField
            label="Titulo"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Descripcion"
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
          />
          
          <FormControl fullWidth variant="outlined" error={assignedToError}>
            <InputLabel id="assignedTo">Asignar a</InputLabel>
            <Select
              labelId="assignedTo"
              id="assignedTo"
              label="Asignar a"
              value={assignedTo}
              onChange={handleAssignedToChange}
              required
            >
              <MenuItem value="">
                <em>Selecciona un usuario</em>
              </MenuItem>
              {usersList?.length > 0 &&
                usersList.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
            </Select>
            {assignedToError && (
              <Typography variant="caption" color="error">
                Selecciona un usuario
              </Typography>
            )}
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isSubmitDisabled}
        >
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTaskModal;
