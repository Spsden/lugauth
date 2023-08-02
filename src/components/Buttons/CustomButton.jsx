import React from "react";
import { Button, Stack,Box, Icon } from "@mui/material";

const CustomButton = ({ title, icon }) => {
  return (
    <Button
      variant="contained"
      fullWidth="true"
      size="large"
      type="submit"
    
      sx={{
        mt: "15px",
        mr: "20px",
        borderRadius: 28,
        color: "#ffffff",
        minWidth: "170px",

        backgroundColor: "#FF9A01",
      }}
    >
      {icon}
      <Box width={10}></Box>
      { title}
    </Button>
  );
};

export default CustomButton;
