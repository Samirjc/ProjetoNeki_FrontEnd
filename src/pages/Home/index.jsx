import React, { useContext, useEffect, useState } from 'react';
import { Button, CardGroup, Col, Container, Dropdown, Modal, Row } from 'react-bootstrap';
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
    const [search, setSearch] = useState("");
    const [reload, setReload] = useState(false);

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
    }, [token, id, reload])

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
            setReload(!reload);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <>
            <Header setSearch={setSearch}/>

            <Container className='mt-5'>
                <Row className='mb-5'>
                    <Col>
                        <h1>Minhas Skills</h1>
                    </Col>

                    <Col className='d-flex justify-content-end'>
                        <Button variant="primary" onClick={handleShow}>Adicionar Skill</Button>
                    </Col>
                </Row>

                <CardGroup className='d-flex justify-content-center flex-wrap gap-3'>
                    {userSkills.filter(item => item.skill.name.toLowerCase().includes(search.toLowerCase())).map(item => (
                        <SKillCard key={item.id} id={item.id} title={item.skill.name} imgUrl={item.skill.imageUrl} description={item.skill.description} level={item.knowledgeLevel} setReload={setReload} reload={reload}/>
                    ))}
                </CardGroup>

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