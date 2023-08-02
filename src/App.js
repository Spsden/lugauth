import React from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import LoggedPage from './pages/LoggedPage';

export default function App() {
  return (
   <>
 
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />}></Route>
        <Route path="/register" exact element={<Register />}></Route>
        <Route path="/reset-password" exact element={<ForgotPassword />}></Route>
        <Route path="/logged-page" exact element={<LoggedPage />}></Route>
      </Routes>
    </BrowserRouter>
   </>
  )
}
