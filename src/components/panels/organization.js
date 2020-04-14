import React, { useState, useEffect } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';

// Services
import { withFirebase } from '../services/Firebase';

const NoOrgs = () => {
    return (
        <Card.Body>
            <Card.Text>
                No organization groups have been configured in the database. Please create an organization to begin making lessons.
            </Card.Text>
        </Card.Body>
    );
};

const HaveOrgs = (props) => {
    const docs = props.docs;
    return (
        <ListGroup variant="flush">
            {docs.map((value, index) => {
                return <ListGroup.Item key={index}>{value.name}</ListGroup.Item>
            })}
        </ListGroup>
    );
};

const OrganizationPanel = (props) => {
    const [ count, setCount ] = useState(0);
    const [ docs, setDocs ] = useState([]);
    const cb = (snapshot) => {
        setDocs([...snapshot]);
        setCount(snapshot.length);
    };

    useEffect(() => {
        props.firebase.doGetAllOrganizations(cb);
    }, [ count, props.firebase ]);

    return (
        <Card className="panel">
            <Card.Header>Organizations</Card.Header>
            {count > 0
            ? <HaveOrgs docs={docs} />
            : <NoOrgs />}
            <Card.Body>
            <Button variant="primary">Create Organization</Button>
            </Card.Body>
        </Card>
    );
};

export default withFirebase(OrganizationPanel);