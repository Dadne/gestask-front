import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskTableHead from "./TableHead";
import TaskTableRow from "./TableRow";
import { useAuth } from "../../context/AuthContext";
import { getTasksList } from "../../services/AppServices";

const TableTasks: React.FC = () => {
  const { token } = useAuth();
  const [tasksData, setTasksData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getTasks = async () => {
    setLoading(true);

    getTasksList(token)
      .then((data) => {
        const tasks = data.data;

        setTasksData(tasks);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getTasks();
    setRefresh(false);
  }, [refresh]);

  function handleCloseModal(): void {
    setOpenModal(false);
  }

  return (
    <>
      <Box sx={{ width: "100%", p: 3, mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" component="h1" fontWeight="bold">
            Tareas
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 2,
              py: 1,
            }}
            onClick={() => setOpenModal(true)}
          >
            Nueva Tarea
          </Button>
        </Box>
        {/* <NewTaskModal open={openModal} onClose={handleCloseModal} /> */}
        <Paper sx={{ width: "100%", mb: 2, borderRadius: 2 }}>
          <TableContainer>
            <Table aria-labelledby="tableTitle">
              <TaskTableHead
                order="asc"
                orderBy="name"
                onRequestSort={() => {}}
              />
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <CircularProgress />
                      <Typography>Cargando tareas...</Typography>
                    </TableCell>
                  </TableRow>
                ) : tasksData.length > 0 ? (
                  tasksData.map((task: any) => (
                    <TaskTableRow
                      key={task._id}
                      task={task}
                      isSelected={false}
                      setRefresh={setRefresh}
                    />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No hay tareas disponibles
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
};

export default TableTasks;
