import React from 'react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import {MemoryRouter} from 'react-router';
import configureStore from 'redux-mock-store';
import ConnectedWeatherContainer from './WeatherContainer';
import Weather from '../components/Weather';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';

configure({adapter: new Adapter()});

const initialState = {
    data: {
        isLoading: true,
        currentConditions: {},
        hourlyForecast: [],
        dailyForecast: [],
    },
    navigationItems: [
        {title: "Weather", path: "/"},
        {title: "About", path: "/about/"}
    ]
};

// jest.mock('../services/weatherService', () => ({
//     fetchForecast: jest.fn(() => () => {
//         return ;
//     }),
// }));

describe('e2e tests for the WeatherContainer', () => {
    const mockStore = configureStore([thunk]);
    let wrapper;
    let store = mockStore(initialState);

    beforeEach(() => {
        //creates the store with any initial state or middleware needed
        wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <ConnectedWeatherContainer />
                </MemoryRouter>
            </Provider>
        );
    });

    it('downloads the weather data when the app is loaded', () => {
        fetchMock.get('*', {
            "current_conditions": {
                "datapoint_hour": "18:50",
                "datapoint_date": "July 16",
                "datapoint_time": "July 16, 18:50",
                "data_point_type": "CURRENT_CONDITIONS",
                "location_name": "London, UK",
                "temperature": 26.27,
                "temperature_min": 0,
                "temperature_max": 0,
                "weather_icon": "wi-cloudy",
                "weather_icon_name": "Clouds",
            },
            "hourly_forecast": [
                {
                    "datapoint_hour": "20:00",
                    "datapoint_date": "July 16",
                    "datapoint_time": "July 16, 20:00",
                    "data_point_type": "HOURLY_FORECAST",
                    "location_name": "London, UK",
                    "temperature": 25.9,
                    "temperature_min": 0,
                    "temperature_max": 0,
                    "weather_icon": "wi-day-sunny",
                    "weather_icon_name": "Intermittent clouds",
                }
            ],
            "daily_forecast": [
                {
                    "datapoint_hour": "00:00",
                    "datapoint_date": "July 17",
                    "datapoint_time": "July 17, 00:00",
                    "data_point_type": "DAILY_FORECAST",
                    "location_name": "London, UK",
                    "temperature": 0,
                    "temperature_min": 15,
                    "temperature_max": 24,
                    "weather_icon": "wi-cloudy",
                    "weather_icon_name": "Heavy Cloud",
                }
            ]
        });

        const weatherContainer = wrapper.find('WeatherContainer');

        // Initially, the app should show the loading message.
        expect(weatherContainer.find('.weather__loading').length).toBe(1);

        // TODO: We want to check the data is set on the state.
    });
});
