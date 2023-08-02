import React from 'react'
import { Grid,TextField } from '@mui/material'

const CustomTextField = ({callback,label,name,autoComplete,id}) => {


  return (
    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
    <TextField

      required
      fullWidth
      id={id}
      label={label}
      name={name}
      autoComplete={autoComplete}
      // onChange={(newValue) => callback(newValue.target.value)}
    />
  </Grid>
  )
}

export default CustomTextField