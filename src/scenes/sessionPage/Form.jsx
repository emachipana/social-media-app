import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth";
import { setLogin } from "../../state";

function Form() {
  const [pageType, setPageType] = useState("login");
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    formData.append("picturePath", values.picture.name);
    
    const newUser = await AuthService.register(formData);
    onSubmitProps.resetForm();

    if(newUser) setPageType("login");
  }

  const login = async (values, onSubmitProps) => {
    const { token, ...user } = await AuthService.login(values);
    onSubmitProps.resetForm();

    if(token && user) {
      dispatch(
        setLogin({ user, token })
      );

      navigate("/home");
    }
  }
}

export default Form;
