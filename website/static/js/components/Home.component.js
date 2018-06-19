import React from 'react';

import WeatherService from '../services/Weather.service';

import Forecast from './Forecast.component';


export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentConditions: null,
            hourlyForecast: null,
            dailyForecast: null,
        };
    }

    render() {
        if (!this.state.currentConditions || !this.state.hourlyForecast || !this.state.dailyForecast) {
            return 'Loading...';
        }
        return (
            <div className="weather">
                <h1 className="weather__location">{this.state.currentConditions.locationName}</h1>
                <span className="weather__date">{this.state.currentConditions.dataTimestamp}</span>
                <span className="weather__temperature">
                    {this.state.currentConditions.temperature}&#x2103;
                </span>

                <div className="text-center">
                    <i className={`weather__icon weather__icon--large wi ${this.state.currentConditions.weatherIcon}`}/>
                    <span className="weather__icon-name">{this.state.currentConditions.weatherName}</span>
                </div>

                <div className="forecast">
                    <Forecast
                        forecastTitle="Next 12 hours"
                        forecastType="hour"
                        dataPoints={this.state.hourlyForecast}
                    />
                    <Forecast
                        forecastTitle="Next 4 days"
                        forecastType="date"
                        dataPoints={this.state.dailyForecast}
                    />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getForecastData();
    }

    getForecastData() {
        WeatherService.getForecastData((res) => {
            const currentWeather = res['current_conditions'];
            const currentConditions = {
                locationName: currentWeather['location_name'],
                dataTimestamp: currentWeather['datapoint_time'],
                temperature: currentWeather['temperature'],
                weatherIcon: currentWeather['weather_icon'],
                weatherName: currentWeather['weather_icon_name'],
                mobileLink: currentWeather['mobile_link'],
            };
            const hourlyForecast = res['hourly_forecast'];
            const dailyForecast = res['daily_forecast'];

            this.setState({
                currentConditions: currentConditions,
                hourlyForecast: hourlyForecast,
                dailyForecast: dailyForecast,
            });
        });
    }
}
