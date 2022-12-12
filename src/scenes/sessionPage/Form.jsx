import { useTheme } from "@emotion/react";
import { 
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery
} from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth";
import { setLogin } from "../../state";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: ""
}

function Form() {
  const [pageType, setPageType] = useState("login");
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const mainColor = theme.palette.primary.main;

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    
    if(values.picture) {
      formData.append("picturePath", values.picture.name);
    }
    
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
      initialValues={initialValues}
      validationSchema={isLogin
        ? loginSchema
        : registerSchema  
      }
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobileScreens ? undefined : "span 4" }
            }}
          >
            {/* form */}
            {isRegister && (
              <>
                <TextField 
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField 
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField 
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField 
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${theme.palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg, .jpeg, .png"
                    multiple={false}
                    onDrop={(files) => 
                      setFieldValue("picture", files[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${mainColor}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" }}}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{ values.picture.name }</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField 
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField 
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: mainColor,
                color: theme.palette.background.alt,
                "&:hover": { color: mainColor }
              }}
            >
              { isLogin ? "Login" : "Register" }
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: mainColor,
                "&:hover": {
                  cursor: "pointer",
                  color: theme.palette.primary.dark
                }
              }}
            >
              {
                isLogin
                  ? "Don't have an account? Sign Up here."
                  : "Already have an account? Login here."
              }
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default Form;
