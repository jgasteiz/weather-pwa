import React from 'react';

import Forecast from './Forecast';

class Weather extends React.Component {
    componentDidMount(prevProps) {
        const {fetchDatapoints} = this.props;
        fetchDatapoints();
    }

    render() {
        const { currentConditions, hourlyForecast, dailyForecast } = this.props;
        if (!currentConditions || !hourlyForecast || !dailyForecast) {
            return 'Loading...';
        }
        return (
            <div className="weather">
                <h1 className="weather__location">{currentConditions.locationName}</h1>
                <span className="weather__date">{currentConditions.dataTimestamp}</span>
                <span className="weather__temperature">
                    {currentConditions.temperature}&#x2103;
                </span>

                <div className="text-center">
                    <i className={`weather__icon weather__icon--large wi ${currentConditions.weatherIcon}`}/>
                    <span className="weather__icon-name">{currentConditions.weatherName}</span>
                </div>

                <div className="forecast">
                    <Forecast
                        forecastTitle="Next 12 hours"
                        forecastType="hour"
                        dataPoints={hourlyForecast}
                    />
                    <Forecast
                        forecastTitle="Next 5 days"
                        forecastType="date"
                        dataPoints={dailyForecast}
                    />
                </div>
            </div>
        );
    }
}

export default Weather;
