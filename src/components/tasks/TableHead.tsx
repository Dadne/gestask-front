
import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel, Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

interface HeadCell {
  id: keyof any;
  label: string;
  numeric: boolean;
  disableSorting?: boolean;
}

const headCells: HeadCell[] = [
  { id: 'title', numeric: false, label: 'Titulo' },
  { id: 'description', numeric: false, label: 'Descripción', disableSorting: true },
  { id: 'dueDate', numeric: false, label: 'Fecha de Vencimiento', disableSorting: true },
  { id: 'assignedTo', numeric: false, label: 'Asignado a', disableSorting: true },
  { id: 'status', numeric: false, label: 'Estatus', disableSorting: true },
];

interface TableHeadProps {
  order: 'asc' | 'desc';
  orderBy: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
}

const TaskTableHead: React.FC<TableHeadProps> = ({

  order,
  orderBy,
  onRequestSort,
}) => {
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id as string} 
            align={headCell.numeric ? 'right' : 'left'}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.disableSorting ? (
              headCell.label
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id as string)} 
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
        <TableCell align="right">Acciones</TableCell> 
      </TableRow>
    </TableHead>
  );
};

export default TaskTableHead;