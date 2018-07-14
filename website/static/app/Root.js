import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';

import WeatherContainer from './containers/WeatherContainer';
import configureStore from './configureStore.js';

// Font awesome
import {library} from '@fortawesome/fontawesome-svg-core';
import {faSync} from '@fortawesome/free-solid-svg-icons';
library.add(faSync);


/**
 * Initial app state:
 * - data: weather data for the app, divided into current weather conditions,
 *         data for the hourly forecast and data for the daily forecast. Also
 *         includes a flag to determine whether the app is loading data or not.
 * - navigationItems: objects to be used for the app navigation.
 */
const initialState = {
    data: {
        currentConditions: {},
        hourlyForecast: [],
        dailyForecast: [],
        isLoading: false,
    },
    navigationItems: [
        {
            title: 'Weather',
            path: '/'
        },
        {
            title: 'About',
            path: '/about/'
        },
    ],
};

class Root extends React.Component {
    render() {
        return (
            <Provider store={configureStore(initialState)}>
                <HashRouter>
                    <WeatherContainer/>
                </HashRouter>
            </Provider>
        );
    }
}

export default Root;
