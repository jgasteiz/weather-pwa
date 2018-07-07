import React from 'react';
import {Route, IndexRoute} from 'react-router'
import {WeatherContainer} from "./containers/WeatherContainer";
import Weather from "./components/Weather";


export default (
    <Route path="/" component={WeatherContainer}>
        <IndexRoute component={Weather}/>
    </Route>
);
