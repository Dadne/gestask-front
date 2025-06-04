import { Box } from '@mui/material';
import React, { useState } from 'react';
import TableTasks from '../components/tasks/TableTasks';

const ListTasks: React.FC = () => {
  
  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
        <Box
            sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
             maxWidth: '90%',
            margin: '0 auto',
            }}
        >
           <TableTasks />
        </Box>
    </Box>
  );
};

export default ListTasks;