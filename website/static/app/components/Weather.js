import React from 'react';
import PropTypes from 'prop-types';

import Forecast from './Forecast';


const Weather = ({currentConditions, hourlyForecast, dailyForecast, isLoading}) =>
    <div className="weather">
        {isLoading
            ? <h1 className="weather__loading">Loading weather...</h1>
            : <div>
                <div id="current-weather">
                    <h1 className="weather__location">{currentConditions.locationName}</h1>
                    <span className="weather__date">{currentConditions.dataTimestamp}</span>
                    <span className="weather__temperature">
                        {currentConditions.temperature}°C
                    </span>

                    <div className="text-center">
                        <i className={`weather__icon weather__icon--large wi ${currentConditions.weatherIcon}`}/>
                        <span className="weather__icon-name">{currentConditions.weatherName}</span>
                    </div>
                </div>

                <div className="forecast">
                    <Forecast
                        id="hourly-forecast"
                        forecastTitle="Next 12 hours"
                        forecastType="hour"
                        dataPoints={hourlyForecast}
                    />
                    <Forecast
                        id="daily-forecast"
                        forecastTitle="Next 5 days"
                        forecastType="date"
                        dataPoints={dailyForecast}
                    />
                </div>
            </div>
        }
    </div>;

Weather.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    currentConditions: PropTypes.object.isRequired,
    hourlyForecast: PropTypes.array.isRequired,
    dailyForecast: PropTypes.array.isRequired,
};

export default Weather;
