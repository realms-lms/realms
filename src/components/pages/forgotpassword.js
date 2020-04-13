import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

//Services
import { withFirebase } from '../services/Firebase';

import * as ROUTES from '../../constants/routes';

const ForgotPassword = (props) => {
    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState(null);

    const onSubmit = (event) => {
        props.firebase.doPasswordReset(email)
            .then(() => {
                props.history.push(ROUTES.ROOT);
            })
            .catch((err) => {
                setError(err);
            });

        event.preventDefault();
    };

    const onChange = (event) => {
        if (event.target.name === "email") {
            setEmail(event.target.value);
        }
        else if (event.target.name === "error") {
            setError(event.target.value);
        }
    };

    const invalid = email === '';

    return (
        <Container className="ForgotPassword">
            <Form.Text>Enter your email below and we'll send you a reset email.</Form.Text>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="email">
                    <Form.Control
                        name="email"
                        value={email}
                        onChange={onChange}
                        type="email"
                        placeholder="Email Address"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={invalid}>Send Email</Button>
                {error && <Form.Text className="error-text">{error.message}</Form.Text>}
            </Form>
        </Container>
    )
};

export default withFirebase(ForgotPassword);