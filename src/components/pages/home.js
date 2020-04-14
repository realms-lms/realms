import React, { useContext } from 'react';

// Services
import { SessionContext } from '../services/Session';

// Components
import SignInPage from './signin';
import Hub from './hub';

const HomePage = () => {
    const session = useContext(SessionContext);

    return (
        <div className="HomePage">
            {session.authUser
            ? <Hub />
            : <SignInPage />}
        </div>
    );
};

export default HomePage;