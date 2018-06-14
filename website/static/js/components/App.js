import React from 'react';

import OpenWeatherMap from '../services/OpenWeatherMap.service';


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
        };
    }

    render() {
        return (
            <div className="weather">
                <h1 className="weather__location">{this.state.locationName}</h1>
                <span className="weather__date">{this.state.dataTimestamp}</span>
                <span className="weather__min-max">
                    min: {this.state.temperatureMin}&#x2103;,
                    max: {this.state.temperatureMax}&#x2103;
                </span>
                <span className="weather__temperature">
                    {this.state.temperature}&#x2103;
                </span>

                <div className="text-center">
                    <i className={`weather__icon wi ${this.state.weatherIcon}`}/>
                    <span
                        className="weather__icon-name">{this.state.weatherName}</span>
                </div>
            </div>
        );
    }

    /**
     * When the component is ready and mounted, initialize key bindings:
     * - arrow right: next page handler
     * - arrow left: previous page handler
     */
    componentDidMount() {
        OpenWeatherMap.getWeatherData((res) => {
            this.setState({
                locationName: res['location_name'],
                dataTimestamp: res['data_time'],
                temperatureMin: res['temperature_min'],
                temperatureMax: res['temperature_max'],
                temperature: res['temperature'],
                weatherIcon: res['weather_icon'],
                weatherName: res['weather_name'],
            });
        });
    }
}
