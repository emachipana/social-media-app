import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth";
import { setLogin } from "../../state";
import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("This field is required"),
  lastName: Yup.string()
    .required("This field is required"),
  email: Yup.string()
    .required("This field is required")
    .email("Invalid email"),
  password: Yup.string()
    .required("This field is required")
    .min(6, "Is too short, minimum 6"),
  location: Yup.string()
    .required("This field is required"),
  occupation: Yup.string()
    .required("This field is required"),
  picture: Yup.string()
});

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("This field is required")
    .email("Invalid email"),
  password: Yup.string()
    .required("This field is required")
    .min(6, "Is too short, minimum 6")
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: ""
}

const initialValuesLogin = {
  email: "",
  password: ""
}

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

  const handleFormSubmit = async (values, onSubmitProps) => {
    if(isLogin) await login(values, onSubmitProps);
    if(isRegister) await register(values, onSubmitProps);
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin
        ? initialValuesLogin
        : initialValuesRegister
      }
      validationSchema={isLogin
        ? loginSchema
        : registerSchema  
      }
    >

    </Formik>
  )
}

export default Form;
