import React from 'react';
import {Provider} from 'react-redux';

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

const Root = () =>
    <Provider store={configureStore(initialState)}>
        <WeatherContainer/>
    </Provider>;

export default Root;
