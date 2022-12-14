import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./scenes/homePage";
import Navbar from "./scenes/navbar";
import ProfilePage from "./scenes/profilePage";

function AuthenticatedApp() {
  return (
    <Box>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </Box>
  )
}

export default AuthenticatedApp;
