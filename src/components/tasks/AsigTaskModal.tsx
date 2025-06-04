// src/components/AssingTaskModal.tsx
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
} from "@mui/material";
import {  assignTask, getUsersList } from "../../services/AppServices"
import { useAuth } from "../../context/AuthContext";

interface User {
  _id: string;
  name: string;
}

interface AssingTaskModalProps {
  open: boolean;
  onClose: () => void;
  taskId: any;
  setRefresh: (refresh: boolean) => void;

}


const AssingTaskModal: React.FC<AssingTaskModalProps> = ({
  open,
  onClose,
  taskId,
  setRefresh,
}) => {
  const { token } = useAuth();
  const [assignedTo, setAssignedTo] = useState<string>("");
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
      getUsers()
    }
  }, [open, taskId]);

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
    assignTask(taskId, assignedTo, token)
      .then((response) => {
        console.log("Tarea asignada:", response);
        alert(`Tarea asignada correctamente a ${assignedTo}.`);
        handleClose();
        setRefresh(true);
      })
      .catch((error) => {
        console.error("Error al asignar la tarea:", error);
        alert(`Error al asignar la tarea: ${error.message}`);
        handleClose();
      });
      
  };

  const handleClose = () => {
    setAssignedTo("");
    setAssignedToError(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Reasignar Tarea</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          noValidate
        >
          <Typography variant="body1">
            ID de la Tarea: {taskId || "N/A"}
          </Typography>

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
              { usersList?.length > 0 && usersList.map((user) => (
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
          Reasignar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssingTaskModal;
