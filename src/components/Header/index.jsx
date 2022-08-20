import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Head } from "./styles";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

    function handleSair() {
        localStorage.removeItem("Authorization");
        navigate("/login");
    }

    return (
        <header className="bg-primary">
            <Container>
                <Head>
                    <div></div>
                    <input placeholder="Buscar"/>
                    <Button onClick={handleSair} variant="light">Sair</Button>
                </Head>
            </Container>
        </header>
    )
}