import React from 'react';

import { withFirebase } from '../Firebase';
import { withAirTable } from '../AirTable';

const SessionContext = React.createContext(null);

export const session = (Component) => {
    class Session extends React.Component {
        constructor(props) {
            super(props);

            this.mounted = false;

            this.state = {
                session: {
                    authUser: null,
                    userProfile: null,
                },
            };
        }

        componentDidMount() {
            this.mounted = true;

            this.props.firebase.doGetOrganization('', this.configureAT.bind(this));

            this.authStateListener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
                if (authUser) {
                    this.setState({
                        session: {
                            authUser: authUser,
                            userProfile: this.state.session.userProfile,
                        },
                    });
                    this.props.airTable.doGetUserProfile(authUser.email, this.onUserProfileChanged.bind(this));
                }
                else {
                    this.setState({
                        session: {
                            authUser: null,
                            userProfile: this.state.session.userProfile,
                        },
                    });
                    this.onUserProfileChanged(null);
                }
            })
        }

        componentWillUnmount() {
            this.mounted = false;
            this.authStateListener();
        }

        configureAT(data) {
            var config = data.airTableApiConfig;
            this.props.airTable.configure(config);
        }

        onUserProfileChanged(userProf) {
            if (this.mounted) {
                if (userProf) {
                    this.setState({
                        session: {
                            authUser: this.state.session.authUser,
                            userProfile: userProf,
                        },
                    });
                }
                else {
                    this.setState({
                        session: {
                            authUser: this.state.session.authUser,
                            userProfile: null,
                        },
                    });
                }
            }
        }

        render() {
            return (
                <SessionContext.Provider value={this.state.session}>
                    <Component {...this.props} />
                </SessionContext.Provider>
            );
        }
    }

    return withFirebase(withAirTable(Session));
}

export { SessionContext };