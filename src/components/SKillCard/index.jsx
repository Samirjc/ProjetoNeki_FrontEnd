import React, { useContext, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';
import { AuthContext } from "../../context/AuthContext";
import { API } from "../../services/api";
import 'bootstrap/dist/css/bootstrap.css';

export const SKillCard = (props) => {
    const {token} = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleDelete() {
        API.delete(`/userSkill/${props.id}`, {headers: {Authorization: token}}).then().catch(error => {
            console.log(error);
        })
    }

    function handleSubmit() {
        API.put(`/userSkill/${props.id}`, update, {headers: {Authorization: token}}).then(res => {
            handleClose();
        }).catch();
    }

    return (
        <Card style={{ width: '18rem', maxWidth: 300 }}>
            <Card.Img height={200} variant="top" src={props.imgUrl} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>

                <Card.Text>
                    level: {props.level}
                </Card.Text>
                
                <div className="d-flex align-items-center justify-content-between">
                    <Button variant="primary" onClick={handleShow}>editar level</Button>
                    <FaTrash style={{cursor: "pointer"}} onClick={handleDelete}/>
                </div>
            </Card.Body>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Level</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <label htmlFor="level">level:</label>
                    <input onChange={(e) => setUpdate({level: Number(e.target.value)})} id="level" className="w-30 m-2" type="number" defaultValue={props.level} />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Adicionar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    )
}