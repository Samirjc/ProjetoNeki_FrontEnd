import React, { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.css';
import { API } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputGroup } from "react-bootstrap";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export const Login = () => {
    const [data, setData] = useState({
        login: "",
        password: ""
    });
    const [remember, setRemember] = useState(false);
    const {handleSetToken} = useContext(AuthContext);
    const navigate = useNavigate();
    const [hide, setHide] = useState(true);
    const notify = () => toast.error("Credenciais inválidas");


    function handleSubmit(e) {
        e.preventDefault();

        API.post("/login", data).then(res => {
            handleSetToken(res.headers.token);

            if(remember) {
                localStorage.setItem("Authorization", res.headers.token);
            }
            navigate("/home");
            
        }).catch(error => {
            notify();
        })
    }

    return (
            <Container className="mt-5 p-4" fluid>
                <Row className="d-flex justify-content-center">
                    <Col md={4} className="d-flex align-items-center justify-content-center bg-primary rounded-2">
                        <h1 className="text-center">Login</h1>
                    </Col>

                    <Col md={4} className="shadow-lg p-5">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Login</Form.Label>
                                <Form.Control required type="text" placeholder="Digite o login" onChange={(e) => setData({...data, login: e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Senha</Form.Label>
                                <InputGroup>
                                    <Form.Control required type={hide ? "password" : "text"} placeholder="Digite a senha" onChange={(e) => setData({...data, password: e.target.value})}/>
                                    <InputGroup.Text onClick={() => setHide(!hide)} style={{cursor: "pointer"}}>
                                        {hide ? <FaEyeSlash /> : <FaEye />}
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Lembrar de mim" onChange={(e) => setRemember(e.target.checked)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Entrar
                            </Button>

                            <p className="mt-4 text-center">Não possui uma conta? <Link to={"/cadastro"}>Clique aqui</Link></p>
                        </Form>
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
    )
}