// src/App.tsx
import React from "react";
import Auth from "./pages/Auth";
import { CssBaseline } from "@mui/material";
import ListTasks from "./pages/ListTasks";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <ListTasks />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
