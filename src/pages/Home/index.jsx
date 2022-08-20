import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Modal, Row } from 'react-bootstrap';
import { Header } from '../../components/Header';
import { SKillCard } from '../../components/SKillCard';
import { AuthContext } from '../../context/AuthContext';
import { API } from '../../services/api';

export const Home = () => {
    const [show, setShow] = useState(false);
    const {token, id} = useContext(AuthContext);
    const [skills, setSkills] = useState([]);
    const [dropdownLabel, setDropdownLabel] = useState("Escolha uma skill");
    const [selectedSkill, setSelectedSkill] = useState();
    const [userSkills, setUserSkills] = useState([]);

    const handleClose = () => {
        setShow(false);
        setDropdownLabel("Escolha uma skill");
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        if(token && id) {
            getSkills();
            getUserSkills();
        }
    }, [token, id])

    function getSkills() {
        API.get("/skill", {headers: {Authorization: token}}).then(res => {
            setSkills(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    function getUserSkills() {
        API.get(`/userSkill/user/${id}`, {headers: {Authorization: token}}).then(res => {
            setUserSkills(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    function handleClickItem(item) {
        setDropdownLabel(item.name);
        setSelectedSkill(item.id);
    }

    function handleSubmit() {
        API.post("/userSkill", {userId: id, skillId: selectedSkill, level: 1}, {headers: {Authorization: token}}).then(res => {
            handleClose();
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <>
            <Header />

            <Container className='mt-5'>
                {console.log(userSkills)}
                <Row className='mb-5'>
                    <Col>
                        <h1>Minhas Skills</h1>
                    </Col>

                    <Col className='d-flex justify-content-end'>
                        <Button variant="primary" onClick={handleShow}>Adicionar Skill</Button>
                    </Col>
                </Row>
                {console.log(userSkills)}
                <Row xs={1} md={3}>
                    {userSkills.map(item => (
                        <Col>
                            <SKillCard id={item.id} title={item.skill.name} imgUrl={item.skill.imageUrl} description={item.skill.description} level={item.knowledgeLevel}/>
                        </Col>
                    ))}
                </Row>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adicionar Skill</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {dropdownLabel}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {skills.map(item => (
                                    <Dropdown.Item key={item.id} onClick={() => handleClickItem(item)}>
                                        {item.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
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
            </Container>
        </>
    )
}