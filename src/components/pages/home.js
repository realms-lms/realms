import React from 'react';

// Services
import { SessionContext } from '../services/Session';

// Components
import SignInPage from './signin';

const HomePage = () => {
    return (
        <div className="HomePage">
            <SessionContext.Consumer>
                {session => session.authUser
                ? <p>Show Home</p>
                : <SignInPage /> }
            </SessionContext.Consumer>
        </div>
    );
};

export default HomePage;