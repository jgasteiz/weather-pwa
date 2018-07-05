import React from 'react';
import {Provider} from 'react-redux';

import WeatherContainer from '../containers/WeatherContainer';

import configureStore from '../configureStore.js';


const store = configureStore();


class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <WeatherContainer/>
            </Provider>
        );
    }
}

export default Root;
