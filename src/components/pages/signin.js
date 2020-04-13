import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Services
import { withFirebase } from '../services/Firebase';

import * as ROUTES from '../../constants/routes';

const SignInPage = (props) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(null);

    const onSubmit = (event) => {
        props.firebase.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                setEmail('');
                setPassword('');
                setError(null);
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
        else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    };

    return (
        <Container className="SignInPage">
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="email">
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Email Address"
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Sign In</Button>
                <Form.Text>Don't have an account? <Link to={ROUTES.SIGNUP}>Get started here.</Link></Form.Text>
                <Form.Text>Forgot your password? <Link to={ROUTES.FORGOTPASSWORD}>We can help with that.</Link></Form.Text>
                {error && <Form.Text className="error-text">{error.message}</Form.Text>}
            </Form>
        </Container>
    );
};

export default withFirebase(SignInPage);