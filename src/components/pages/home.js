import React, { useContext } from 'react';

// Services
import { SessionContext } from '../services/Session';

// Components
import SignInPage from './signin';

const HomePage = () => {
    const session = useContext(SessionContext);

    return (
        <div className="HomePage">
            {session.authUser
            ? <p>HomePage works!</p>
            : <SignInPage />}
        </div>
    );
};

export default HomePage;