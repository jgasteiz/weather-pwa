import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Weather from '../components/Weather';

import dataPointsActionCreators from '../actions/dataPointsActionCreators.js';

export class WeatherContainer extends React.Component {
    componentDidMount() {
        this.props.fetchDatapoints();
    }
    render () {
        const {currentConditions, hourlyForecast, dailyForecast, isLoading} = this.props;
        return (
            <Weather
                currentConditions={currentConditions}
                hourlyForecast={hourlyForecast}
                dailyForecast={dailyForecast}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = (state) => {
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
        isLoading: state.isLoading,
        currentConditions: getCurrentConditions(state.dataPoints),
        hourlyForecast: getHourlyForecast(state.dataPoints),
        dailyForecast: getDailyForecast(state.dataPoints),
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchDatapoints: bindActionCreators(dataPointsActionCreators.fetchDatapoints, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
