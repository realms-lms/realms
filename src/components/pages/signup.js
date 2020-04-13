import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

// Services
import { withFirebase } from '../services/Firebase';
import { withAirTable } from '../services/AirTable';

import * as ROUTES from '../../constants/routes';

const SignUp = (props) => {
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ code, setCode ] = useState('');
    const [ error, setError ] = useState(null);

    const onSubmit = (event) => {
        props.firebase.doCreateUserWithEmailAndPassword(email, password)
            .then(() => {
                props.airTable.doCreateUserRecord(firstName, lastName, email, code);
                props.history.push(ROUTES.ROOT);
            })
            .catch((err) => {
                setError(err);
            });
        
        event.preventDefault();
    };

    const onChange = (event) => {
        var value = event.target.value;
        switch (event.target.name) {
            case "firstName":
                setFirstName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                break;
            case "code":
                setCode(value);
                break;
            case "error":
                setError(value);
                break;
            default:
                break;
        }
    };

    const invalid = firstName === '' || lastName === '' || email === ''
        || password === '' || confirmPassword === '' || code === '';
    
    return (
        <Container className="SignUp">
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Control
                        name="firstName"
                        value={firstName}
                        onChange={onChange}
                        type="text"
                        placeholder="First Name"
                    />
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Control
                        name="lastName"
                        value={lastName}
                        onChange={onChange}
                        type="text"
                        placeholder="Last Name"
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Control
                        name="email"
                        value={email}
                        onChange={onChange}
                        type="email"
                        placeholder="Email Address"
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Control
                        name="password"
                        value={password}
                        onChange={onChange}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Control
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </Form.Group>
                <Form.Group controlId="code">
                    <Form.Control
                        name="code"
                        value={code}
                        onChange={onChange}
                        type="text"
                        placeholder="Access Code"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={invalid}>Sign Up</Button>
                {error && <Form.Text className="error-text">{error.message}</Form.Text>}
            </Form>
        </Container>
    );
};

export default withFirebase(withAirTable(SignUp));