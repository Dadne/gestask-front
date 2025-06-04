
import React, { useState } from 'react';
import {
  Box,
  Tab,
  Tabs,
} from '@mui/material';
import RegisterForm from '../components/auth/Register';
import LoginForm from '../components/auth/LoginForm';

const Auth: React.FC = () => {
  const [tab, setTab] = useState<number>(0);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', 
        backgroundColor: '#f0f2f5', 
        
        backgroundImage: 'linear-gradient(to right bottom, #e0f2f7, #c1e7f0, #9fdded, #77d3eb, #41c8e8)',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3, 
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
       <Tabs 
        value={tab}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ mb: 3 }}
        onChange={(event, newValue) => {
          setTab(newValue);
        }}
      >
        <Tab label="Iniciar Sesión" />
        <Tab label="Registrarse" />
       </Tabs>
       {tab === 0 && <LoginForm />}
       {tab === 1 && <RegisterForm />}
      </Box>
    </Box>
  );
};

export default Auth;