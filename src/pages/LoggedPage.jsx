import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


const LoggedPage = ({username,loggedvia}) => {
    const nav = useLocation();
    const navy = nav.state
  return (
    <div>{navy}</div>
  )
}

export default LoggedPage