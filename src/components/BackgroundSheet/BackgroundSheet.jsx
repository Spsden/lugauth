import React from "react";
import {Box,Grid} from "@mui/material"
import bg from "../../pages/bg/login.svg";

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

const BackgroundSheet = ({page}) => {
  return <div
  style={{
 
    height: "100vh",
    color: "#f5f5f5",
  }}
>
  <Box sx={boxstyle}>
    <Grid container>
      <Grid item xs={12} sm={12} lg={6}>
        <Box
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            marginTop: "0px",
            marginLeft: "15px",
            marginRight: "15px",
            height: "75vh",
            color: "#f5f5f5",
          }}
        ></Box>
      </Grid>
      <Grid item xs={12} sm={12} lg={6}>
        <Box
          style={{
            backgroundSize: "cover",
            height: "75vh",
            minHeight: "500px",
            backgroundColor: "black",
          }}
        >
            {page}
         
        </Box>
      </Grid>
    </Grid>
  </Box>
</div>
};

export default BackgroundSheet;
