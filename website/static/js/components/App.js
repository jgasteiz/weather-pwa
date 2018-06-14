import React from 'react';

import Weather from '../services/Weather.service';


const FORECAST = 'forecast';


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
                    <img src={this.state.weatherIcon}/>
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
            return (<tr className="text-center" key={data.data_time}>
                <td>
                    {data.data_time}
                </td>
                <td>
                    <div>{data.temperature}</div>
                    <div><img src={data.weather_icon} alt={data.weather_name}/></div>
                    <div>{data.weather_name}</div>
                </td>
                <td>{data.precipitation_probability}%</td>
            </tr>);
        });

        return (
            <div>
                <h3>Forecast</h3>
                <table className="table table-striped">
                    <thead>
                    <tr className="text-center">
                        <th scope="col">Time</th>
                        <th scope="col">Temperature</th>
                        <th scope="col">Precipitation probability</th>
                    </tr>
                    </thead>
                    <tbody>
                        {forecastRows}
                    </tbody>
                </table>
            </div>
        );
    }

    /**
     * When the component is ready and mounted, initialize key bindings:
     * - arrow right: next page handler
     * - arrow left: previous page handler
     */
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
