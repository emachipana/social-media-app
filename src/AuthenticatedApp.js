import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./scenes/navbar";

function AuthenticatedApp() {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<h1>Home page</h1>} />
        <Route path="/profile/:id" element={<h1>Profile page</h1>} />
      </Routes>
    </Box>
  )
}

export default AuthenticatedApp;
