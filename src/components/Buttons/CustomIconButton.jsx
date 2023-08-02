import { IconButton } from '@mui/material'
import React from 'react'


const CustomIconButton = ({title,icon}) => {
  return (
    <IconButton
    children={icon}
    
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
    {title}
  </IconButton>
  )
}

export default CustomIconButton