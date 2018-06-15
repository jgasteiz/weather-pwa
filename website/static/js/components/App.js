import React from 'react';

import Weather from '../services/Weather.service';


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locationName: '',
            dataTimestamp: '',
            temperatureMin: '',
            temperatureMax: '',
            temperature: '',
            weatherIcon: '',
            weatherName: '',
            forecast: [],
        };
    }

    render() {
        return (
            <div className="weather">
                <h1 className="weather__location">{this.state.locationName}</h1>
                <span className="weather__date">{this.state.dataTimestamp}</span>
                <span className="weather__temperature">
                    {this.state.temperature}&#x2103;
                </span>

                <div className="text-center">
                    <i className={`weather__icon weather__icon--large wi ${this.state.weatherIcon}`}/>
                    <span className="weather__icon-name">{this.state.weatherName}</span>
                </div>

                <div className="forecast">{this._renderForecast()}</div>
            </div>
        );
    }

    _renderForecast() {
        if (this.state.forecast.length === 0) {
            return '';
        }
        const forecastRows = this.state.forecast.map(function (data, index) {
            return (
                <div className="forecast__hour" key={data.data_hour}>
                    <div>{data.temperature}</div>
                    <div><i className={`weather__icon wi ${data.weather_icon}`}/></div>
                    <div>{data.data_hour}</div>
                </div>
            );
        });

        return (
            <div>
                <h3>Forecast</h3>
                <div className="forecast__data-wrp">
                    <div className="forecast__data">
                        {forecastRows}
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getForecastData();
    }

    getForecastData() {
        Weather.getForecastData((res) => {
            const forecast = res;
            const firstForecastItem = forecast[0];
            this.setState({
                locationName: firstForecastItem['location_name'],
                dataTimestamp: firstForecastItem['data_time'],
                temperature: firstForecastItem['temperature'],
                weatherIcon: firstForecastItem['weather_icon'],
                weatherName: firstForecastItem['weather_name'],
                mobileLink: firstForecastItem['mobile_link'],
                forecast: forecast
            });
        });
    }
}
