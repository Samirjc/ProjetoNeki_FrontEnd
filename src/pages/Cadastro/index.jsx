import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.css';
import { API } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

export const Cadastro = () => {
    const [data, setData] = useState({
        login: "",
        password: ""
    });
    const [confirmPass, setConfirmPass] = useState("");
    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();

        if(data.password === confirmPass) {
            API.post("/user", data).then(res => {
                navigate("/login");
            }).catch(error => {
                console.log("deu erro: " + error);
            })
        }else{
            alert("algo errado");
        }
    }

    return (
            <Container className="mt-5 p-4" fluid>
                <Row className="d-flex justify-content-center">
                    <Col md={4} className="d-flex align-items-center justify-content-center bg-primary rounded-2">
                        <h1 className="text-center">Cadastro</h1>
                    </Col>

                    <Col md={4} className="shadow-lg p-5">
                        <Form onSubmit={handleSubmit} novalidate>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Login</Form.Label>
                                <Form.Control required type="text" placeholder="Digite o login" onChange={(e) => setData({...data, login: e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control required type="password" placeholder="Digite a senha" onChange={(e) => setData({...data, password: e.target.value})}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirmar senha</Form.Label>
                                <Form.Control required type="password" placeholder="Digite a senha novamente" onChange={(e) => setConfirmPass(e.target.value)}/>
                            </Form.Group>
                            
                            <Button variant="primary" type="submit">
                                Cadastrar
                            </Button>
                            
                            <p className="mt-4 text-center">Já possui uma conta? <Link to={"/login"}>Entre aqui</Link></p>
                        </Form>
                    </Col>
                </Row>
            </Container>
    )
}