import { Route, Routes } from "react-router-dom";
import SessionPage from "./scenes/sessionPage";

function UnauthenticatedApp() {
  return (
    <Routes>
      <Route index path="/" element={<SessionPage />} />
    </Routes>
  )
}

export default UnauthenticatedApp;
