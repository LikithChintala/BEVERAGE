import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';


export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                <Link to='/admin' >
                    <Button variant="secondary">Admin</Button>
                </Link>
                    </Col>
                    <Col>
                <Link to='/customer' >
                    <Button variant="secondary">Customer</Button>
                </Link>
                </Col>

                </Row>
           
            </Container>
        )
    }


}