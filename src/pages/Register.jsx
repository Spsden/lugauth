import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import bg from "./bg/login.svg";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";
import BackgroundSheet from "../components/BackgroundSheet/BackgroundSheet";
import CustomTextField from "../components/TextField/CustomTextField";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "75%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const center = {
  position: "relative",
  top: "50%",
  left: "30%",
};

export default function Register() {
  const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const [userToke, setuserToken] = useState(null);
  const [receiveduser, setreceiveduser] = useState(null);

  const postUserName = (email, password) => {
    console.log(
      JSON.stringify({
        username: email,
        email: email,
        password: password,
      })
    );

    fetch("http://localhost:3000/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: email,
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setuserToken(json.token);
        setreceiveduser(json.user);
      });

    navigate("/");
  };

  const handleSubmit = async (event) => {
    setOpen(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // const values = data.values();
    const username = data.get("email");
    const password = data.get("password");

    postUserName(username, password);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  // const [username, setusername] = useState(null);
  // const [password, setpassword] = useState(null);
  // const [passCheck,setPassCheck] = useState(null);

  // const handleUserName = (user)=>{
  //   setusername(user)

  // }
  // const handlePassword = (pass)=>{

  //   setpassword(pass)

  // }
  // console.log(username)
  // console.log(password)

  const RegisterPage = () => {
    return (
      <ThemeProvider theme={darkTheme}>
        <Container>
          <Box height={35} />
          <Box sx={center}>
            <Avatar sx={{ ml: "85px", mb: "4px", bgcolor: "#ffffff" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Create Account
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
            <Grid container spacing={1}>
              <CustomTextField
                // callback = {handleUserName}
                autoComplete="email"
                id="email"
                label="Username"
                name="email"
              />
              <CustomTextField
                // callback = {handlePassword}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
              <CustomTextField
                //  callback = {handlePassword}
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="new-password"
              />

              <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth="true"
                  size="large"
                  sx={{
                    mt: "15px",
                    mr: "20px",
                    borderRadius: 28,
                    color: "#ffffff",
                    minWidth: "170px",
                    backgroundColor: "#FF9A01",
                  }}
                >
                  Register
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                <Stack direction="row" spacing={2}>
                  <Typography
                    variant="body1"
                    component="span"
                    style={{ marginTop: "10px" }}
                  >
                    Already have an Account?{" "}
                    <span
                      style={{ color: "#beb4fb", cursor: "pointer" }}
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Sign In
                    </span>
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    );
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed! Enter correct username and password.
        </Alert>
      </Snackbar>
      <BackgroundSheet page={<RegisterPage />} />
    </>
  );
}
