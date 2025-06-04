import React, { useState } from "react";
import { TableRow, TableCell, Box, styled } from "@mui/material";
import ActionsMenu from "./Actions";
import { useAuth } from "../../context/AuthContext";
import AssingTaskModal from "./AsigTaskModal";
import { completeTask } from "../../services/AppServices";

interface Task {
  _id: number;
  title: string;
  description: string;
  expirationDate: string;
  status: string;
  assignedTo: any;
}

interface TaskTableRowProps {
  task: Task;
  isSelected: boolean;
  setRefresh: (refresh: boolean) => void;
}

const CreatedStatus = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(30, 144, 255, 0.2)",
  color: theme.palette.primary.dark,
  padding: "4px 8px",
  borderRadius: "4px",
  display: "inline-block",
  fontSize: "0.75rem",
  fontWeight: 500,
}));

const ActiveStatus = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 215, 0, 0.2)",
  color: theme.palette.warning.dark,
  padding: "4px 8px",
  borderRadius: "4px",
  display: "inline-block",
  fontSize: "0.75rem",
  fontWeight: 500,
}));

const ClosedStatus = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(60, 179, 113, 0.2)",
  color: theme.palette.success.dark,
  padding: "4px 8px",
  borderRadius: "4px",
  display: "inline-block",
  fontSize: "0.75rem",
  fontWeight: 500,
}));

const TaskTableRow: React.FC<TaskTableRowProps> = ({
  task,
  isSelected,
  setRefresh,
}) => {
  const { token } = useAuth();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleAssing = (id: number) => {
    setOpenModal(true);
  };

  const handleComplete = (id: string) => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres completar la tarea ${task.title}?`
      )
    ) {
      completeTask(id, token)
        .then((response) => {
          console.log("Tarea completada:", response);
          alert(`Tarea ${task.title} completada correctamente.`);
          setRefresh(true);
        })
        .catch((error) => {
          console.error("Error al completar la tarea:", error);
          alert(`Error al completar la tarea ${task.title}.`);
        });
    }
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case "CREATED":
        return <CreatedStatus>Creada</CreatedStatus>;
      case "IN_PROGRESS":
        return <ActiveStatus>En Progreso</ActiveStatus>;
      case "COMPLETED":
        return <ClosedStatus>Completada</ClosedStatus>;
      default:
        return <ActiveStatus>{status}</ActiveStatus>;
    }
  };

  return (
    <>
      <AssingTaskModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        taskId={task._id}
        setRefresh={setRefresh}
      />

      <TableRow hover selected={isSelected}>
        <TableCell>{task.title}</TableCell>
        <TableCell>{task.description}</TableCell>
        <TableCell>{task.expirationDate}</TableCell>
        <TableCell>{task.assignedTo.name}</TableCell>

        <TableCell>{renderStatus(task.status)}</TableCell>
        <TableCell align="right">
          <ActionsMenu
            id={task._id}
            onAssing={handleAssing}
            onComplete={handleComplete}
          />
        </TableCell>
      </TableRow>
    </>
  );
};

export default TaskTableRow;
