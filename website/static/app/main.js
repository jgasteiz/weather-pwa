import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';


if (document.getElementById('weather-app')) {
    ReactDOM.render(
        <Root/>,
        document.getElementById('weather-app')
    );
}
