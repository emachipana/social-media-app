import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AuthenticatedApp from "./AuthenticatedApp";
import { themeSettings } from "./theme";
import UnauthenticatedApp from "./UnauthenticatedApp";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [ mode ]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          { isAuth ? <AuthenticatedApp /> : <UnauthenticatedApp /> }
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
