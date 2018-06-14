import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';


if (document.getElementById('weather-app')) {
    ReactDOM.render(
        <App/>,
        document.getElementById('weather-app')
    );
}
