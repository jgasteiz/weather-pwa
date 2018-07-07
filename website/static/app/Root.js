import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import WeatherContainer from './containers/WeatherContainer';

import configureStore from './configureStore.js';


const store = configureStore();


class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <WeatherContainer/>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default Root;
