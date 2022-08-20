import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Cadastro } from "../pages/Cadastro";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";

function IsAuth(Component) {
    const {token} = useContext(AuthContext);
    return token || localStorage.getItem("Authorization") ? Component : <Navigate to={{ pathname: "/login" }}/>
}

function InitialPage() {
    const {token} = useContext(AuthContext);
    return token || localStorage.getItem("Authorization") ? <Navigate to={{ pathname: "/home" }}/> : <Navigate to={{ pathname: "/login" }}/>
}

export function Rotas() {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={InitialPage()} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={IsAuth(<Home />)} />
        </Routes>
      </BrowserRouter>
    )
}