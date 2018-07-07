import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Weather from '../components/Weather';

import dataPointsActionCreators from '../actions/dataPointsActionCreators.js';


const WeatherContainer = connect(
    function mapStateToProps(state, props) {
        function getCurrentConditions(dataPoints) {
            if (!dataPoints || !dataPoints.hasOwnProperty('current_conditions')) {
                return {};
            }
            const currentWeather = dataPoints['current_conditions'];
            return {
                locationName: currentWeather['location_name'],
                dataTimestamp: currentWeather['datapoint_time'],
                temperature: currentWeather['temperature'],
                weatherIcon: currentWeather['weather_icon'],
                weatherName: currentWeather['weather_icon_name'],
                mobileLink: currentWeather['mobile_link'],
            };
        }

        function getHourlyForecast(dataPoints) {
            if (!dataPoints || !dataPoints.hasOwnProperty('hourly_forecast')) {
                return [];
            }
            return dataPoints['hourly_forecast'];
        }

        function getDailyForecast(dataPoints) {
            if (!dataPoints || !dataPoints.hasOwnProperty('daily_forecast')) {
                return [];
            }
            return dataPoints['daily_forecast'];
        }

        return {
            dataPoints: state.dataPoints,
            currentConditions: getCurrentConditions(state.dataPoints),
            hourlyForecast: getHourlyForecast(state.dataPoints),
            dailyForecast: getDailyForecast(state.dataPoints),
        };
    },
    function mapDispatchToProps(dispatch) {
        return bindActionCreators(dataPointsActionCreators, dispatch);
    }
)(Weather);

export default WeatherContainer;
