import { Navigate, Route, Routes } from "react-router-dom";

function AuthenticatedApp() {
  return (
    <Routes>
      <Route index path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<h1>Home page</h1>} />
      <Route path="/profile/:id" element={<h1>Profile page</h1>} />
    </Routes>
  )
}

export default AuthenticatedApp;
