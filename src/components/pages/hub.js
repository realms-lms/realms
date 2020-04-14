import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Panels
import OrganizationPanel from '../panels/organization';

const Hub = () => {
    return (
        <Container className="Hub" fluid="xl">
            <Row>
                <Col xs="12" md="4">
                <OrganizationPanel />
                </Col>
            </Row>
        </Container>
    )
};

export default Hub;