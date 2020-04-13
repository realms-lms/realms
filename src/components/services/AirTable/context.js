import React from 'react';

const AirTableContext = React.createContext(null);

export const withAirTable = (Component) => (props) => (
    <AirTableContext.Consumer>
        {airTable => <Component {...props} airTable={airTable} />}
    </AirTableContext.Consumer>
);

export default AirTableContext;