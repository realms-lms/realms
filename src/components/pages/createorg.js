import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

// Services
import { withFirebase } from '../services/Firebase';
import { withAirTable } from '../services/AirTable';

const CreateOrganization = (props) => {
    const [ orgId, setOrgId ] = useState(null);
    const [ name, setName ] = useState('');
    const [ apiKey, setApiKey ] = useState('');
    const [ baseId, setBaseId ] = useState('');
    const [ error, setError ] = useState(null);

    const onSubmit = (event) => {
        props.firebase.doAddOrganization(name, apiKey, baseId, '', '', setOrgId);
        console.log(orgId);
        event.preventDefault();
    };

    const onChange = (event) => {
        var value = event.target.value;
        switch (event.target.name) {
            case "name":
                setName(value);
                break;
            case "apiKey":
                setApiKey(value);
                break;
            case "baseId":
                setBaseId(value);
                break;
            case "error":
                setError(value);
                break;
            default:
                break;
        }
    };

    const invalid = name === '' || apiKey === '' || baseId === '';

    return (
        <Container className="CreateOrganization">
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="name">
                    <Form.Control
                        name="name"
                        value={name}
                        onChange={onChange}
                        type="text"
                        placeholder="Organization Name"
                    />
                </Form.Group>
                <Form.Group controlId="apiKey">
                    <Form.Control
                        name="apiKey"
                        value={apiKey}
                        onChange={onChange}
                        type="text"
                        placeholder="AirTable API Key"
                    />
                </Form.Group>
                <Form.Group controlId="baseId">
                    <Form.Control
                        name="baseId"
                        value={baseId}
                        onChange={onChange}
                        type="text"
                        placeholder="AirTable Base ID"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={invalid}>Submit</Button>
                {error && <Form.Text className="error-text">{error.message}</Form.Text>}
            </Form>
        </Container>
    );
};

export default withFirebase(withAirTable(CreateOrganization));