import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.css';
import { API } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { InputGroup } from "react-bootstrap";

export const Cadastro = () => {
    const [data, setData] = useState({
        login: "",
        password: ""
    });
    const [confirmPass, setConfirmPass] = useState("");
    const navigate = useNavigate();
    const [hide, setHide] = useState(true);
    const [hideConfirm, setHideConfirm] = useState(true);
    const [status, setStatus] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        if(!validate()) return;

        API.post("/user", data).then(res => {
            navigate("/login");
        }).catch(error => {
            if(error.response.headers.errormsg) {
                setStatus(error.response.headers.errormsg);
            }
        })
    }

    function validate() {
        if(!data.login) {
            setStatus("Necessário preencher o login");
            return false;
        }
        if(!data.password) {
            setStatus("Necessário preencher a senha");
            return false;
        }
        if(!confirmPass) {
            setStatus("Necessário confirmar a senha");
            return false;
        }
        if(data.password !== confirmPass) {
            setStatus("As senhas precisam ser iguais");
            return false;
        }

        return true;
    }

    return (
            <Container className="mt-5 p-4" fluid>
                <Row className="d-flex justify-content-center">
                    <Col md={4} className="d-flex align-items-center justify-content-center bg-primary rounded-2">
                        <h1 className="text-center">Cadastro</h1>
                    </Col>

                    <Col md={4} className="shadow-lg p-5">
                        {status &&
                            <div className="bg-danger text-center mb-2 p-2 rounded-3">{status}</div>
                        }
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" placeholder="Digite o login" onChange={(e) => setData({...data, login: e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Senha</Form.Label>
                                <InputGroup>
                                    <Form.Control type={hide ? "password" : "text"} placeholder="Digite a senha" onChange={(e) => setData({...data, password: e.target.value})}/>
                                    <InputGroup.Text onClick={() => setHide(!hide)} style={{cursor: "pointer"}}>
                                        {hide ? <FaEyeSlash /> : <FaEye />}
                                    </InputGroup.Text>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirmar senha</Form.Label>
                                <InputGroup>
                                    <Form.Control type={hideConfirm ? "password" : "text"} placeholder="Digite a senha novamente" onChange={(e) => setConfirmPass(e.target.value)}/>
                                    <InputGroup.Text onClick={() => setHideConfirm(!hideConfirm)} style={{cursor: "pointer"}}>
                                        {hideConfirm ? <FaEyeSlash /> : <FaEye />}
                                    </InputGroup.Text>
                                </InputGroup>
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