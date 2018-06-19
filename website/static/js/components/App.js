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
            hourlyForecast: [],
            dailyForecast: [],
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
        if (this.state.hourlyForecast.length === 0) {
            return '';
        }
        const hourlyForecastRows = this.state.hourlyForecast.map(function (data, index) {
            return (
                <div className="forecast__hour" key={data.datapoint_hour}>
                    <div>{data.temperature}</div>
                    <div><i className={`weather__icon wi ${data.weather_icon}`}/></div>
                    <div>{data.datapoint_hour}</div>
                </div>
            );
        });
        const dailyForecastRows = this.state.dailyForecast.map(function (data, index) {
            return (
                <div className="forecast__date" key={data.datapoint_date}>
                    <div>high: {data.temperature_max}</div>
                    <div>low: {data.temperature_min}</div>
                    <div><i className={`weather__icon wi ${data.weather_icon}`}/></div>
                    <div>{data.datapoint_date}</div>
                </div>
            );
        });

        return (
            <div>
                <div className="forecast__group">
                    <h3>Next 12 hours</h3>
                    <div className="forecast__data-wrp">
                        <div className="forecast__data">
                            {hourlyForecastRows}
                        </div>
                    </div>
                </div>
                <div className="forecast__group">
                    <h3>Next 4 days</h3>
                    <div className="forecast__data-wrp">
                        <div className="forecast__data">
                            {dailyForecastRows}
                        </div>
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
            const currentWeather = res['current_conditions'];
            const hourlyForecast = res['hourly_forecast'];
            const dailyForecast = res['daily_forecast'];

            this.setState({
                locationName: currentWeather['location_name'],
                dataTimestamp: currentWeather['datapoint_time'],
                temperature: currentWeather['temperature'],
                weatherIcon: currentWeather['weather_icon'],
                weatherName: currentWeather['weather_icon_name'],
                mobileLink: currentWeather['mobile_link'],
                hourlyForecast: hourlyForecast,
                dailyForecast: dailyForecast,
            });
        });
    }
}
