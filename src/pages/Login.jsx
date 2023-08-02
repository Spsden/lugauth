import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
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
import CustomButton from "../components/Buttons/CustomButton";
import { Google, CurrencyBitcoinRounded } from "@mui/icons-material";
import BackgroundSheet from "../components/BackgroundSheet/BackgroundSheet";
import CustomTextField from "../components/TextField/CustomTextField";
import Web3 from 'web3';

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
  left: "37%",
};
let web3 = undefined; // Will hold the web3 instance

export default function Login() {
  const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // Loading button state

  const handleAuthenticate = ({
		publicAddress,
		signature,
	}) =>
		fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
			body: JSON.stringify({ publicAddress, signature }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}).then((response) => { navigate("/logged-page",{ state:response.text });});

	const handleSignMessage = async ({
		publicAddress,
		nonce,
	}) => {
		try {
			const signature = await web3.eth.personal.sign(
				`I am signing my one-time nonce: ${nonce}`,
				publicAddress,
				'' // MetaMask will ignore the password argument here
			);

			return { publicAddress, signature };
		} catch (err) {
			throw new Error(
				'You need to sign the message to be able to log in.'
			);
		}
	};


  

  const handleClick = async () => {
    console.log("clicked")
		// Check if MetaMask is installed
		if (!(window).ethereum) {
			window.alert('Please install MetaMask first.');
			return;
		}

		if (!web3) {
			try {
				// Request account access if needed
				await (window ).ethereum.enable();

				// We don't know window.web3 version, so we use our own instance of Web3
				// with the injected provider given by MetaMask
				web3 = new Web3((window ).ethereum);
			} catch (error) {
				window.alert('You need to allow MetaMask.');
				return;
			}
		}

		const coinbase = await web3.eth.getCoinbase();
		if (!coinbase) {
			window.alert('Please activate MetaMask first.');
			return;
		}

		const publicAddress = coinbase.toLowerCase();
		setLoading(true);

    const handleSignup = (publicAddress) =>
		fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
			body: JSON.stringify({ publicAddress }),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		}).then((response) => response.json());

		
		fetch(
			`${process.env.REACT_APP_BACKEND_URL}/users?publicAddress=${publicAddress}`
		)
			.then((response) => response.json())
			
			.then((users) =>
				users.length ? users[0] : handleSignup(publicAddress)
			)
			
			.then(handleSignMessage)
	
			.then(handleAuthenticate)
			
			.catch((err) => {
				window.alert(err);
				setLoading(false);
			});

     
	};

  const postUserName = (email, password) => {
    // console.log(
    //   JSON.stringify({
    //     username: email,
    //     email: email,
    //     password: password,
    //   })
    // );

    fetch("http://localhost:3000/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({
       
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(async(response) => {
        let data = await response.json();
        console.log(data)
    
        if(response.status === 200){
          
          navigate("/logged-page",{ state: data });

        }
        
        

      }).then(()=> {
        console.log("hellloe")
      })
      

    
  };

  const handleSubmit = async (event) => {
    setOpen(true);
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const values = data.values();
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

  const LoginPage = () => {
    return (
      <>
        <ThemeProvider theme={darkTheme}>
          <Container>
            <Box height={35} />
            <Box sx={center}>
              <Avatar sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h4">
                Sign In
              </Typography>
            </Box>

            <Button
      variant="contained"
      fullWidth="true"
      size="large"
      onClick={handleClick}
    
      sx={{
        mt: "15px",
        mr: "20px",
        borderRadius: 28,
        color: "#ffffff",
        minWidth: "170px",

        backgroundColor: "#FF9A01",
      }}
    >
    
      <Box width={10}></Box>
     Sign in with metamask
    </Button>
           

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              <Grid container spacing={1}>
                <CustomTextField
                  autoComplete="email"
                  id="email"
                  label="Username"
                  name="email"
                />
                <CustomTextField
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />

                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                  <Stack direction="row" spacing={2}>
                    <FormControlLabel
                      sx={{ width: "60%" }}
                      onClick={() => setRemember(!remember)}
                      control={<Checkbox checked={remember} />}
                      label="Remember me"
                    />
                    <Typography
                      variant="body1"
                      component="span"
                      onClick={() => {
                        navigate("/reset-password");
                      }}
                      style={{ marginTop: "10px", cursor: "pointer" }}
                    >
                      Forgot password?
                    </Typography>
                  </Stack>
                </Grid>

                <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                  <CustomButton title={"Login"} />
                 
                </Grid>

                <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                  <Stack direction="row" spacing={2}>
                    <Typography
                      variant="body1"
                      component="span"
                      style={{ marginTop: "10px" }}
                    >
                      Not registered yet?{" "}
                      <span
                        style={{ color: "#beb4fb", cursor: "pointer" }}
                        onClick={() => {
                          navigate("/register");
                        }}
                      >
                        Create an Account
                      </span>
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </ThemeProvider>
      </>
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
      <BackgroundSheet page={<LoginPage />} />
    </>
  );
}
