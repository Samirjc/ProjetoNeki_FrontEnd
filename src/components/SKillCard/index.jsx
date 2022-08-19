import React from "react";
import { Button, Card } from "react-bootstrap";

export const SKillCard = (props) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.imgUrl} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>

                <Card.Text>
                    level: {props.level}
                </Card.Text>
                
                <Button variant="primary">editar level</Button>
            </Card.Body>
        </Card>
    )
}