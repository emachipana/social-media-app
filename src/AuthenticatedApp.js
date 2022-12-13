import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./scenes/homePage";
import Navbar from "./scenes/navbar";
import UserService from "./services/user";
import { setUser } from "./state";

function AuthenticatedApp() {
  const { id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const user = await UserService.getUser(token, id);

      dispatch(setUser({user}));
    }

    fetch();
  }, [dispatch, id, token]);

  return (
    <Box>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:id" element={<h1>Profile page</h1>} />
      </Routes>
    </Box>
  )
}

export default AuthenticatedApp;
