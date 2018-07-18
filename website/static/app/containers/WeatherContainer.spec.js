import React from 'react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import {createStore,  compose, applyMiddleware} from 'redux';
import {MemoryRouter} from 'react-router';
import appReducers from '../reducers/appReducers';
import ConnectedWeatherContainer from './WeatherContainer';
import Weather from '../components/Weather';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});


const flushPromises = () => new Promise((resolve) => setTimeout(resolve));


jest.mock('../services/apiClient', () => ({
    fetchApiForecast: jest.fn(() => {
        const data = {
            current_conditions: {
                datapoint_hour: "18:50",
                datapoint_date: "July 16",
                datapoint_time: "July 16, 18:50",
                data_point_type: "CURRENT_CONDITIONS",
                location_name: "London, UK",
                temperature: 26.27,
                temperature_min: 0,
                temperature_max: 0,
                weather_icon: "wi-cloudy",
                weather_icon_name: "Clouds",
            },
            hourly_forecast: [
                {
                    datapoint_hour: "20:00",
                    datapoint_date: "July 16",
                    datapoint_time: "July 16, 20:00",
                    data_point_type: "HOURLY_FORECAST",
                    location_name: "London, UK",
                    temperature: 25.9,
                    temperature_min: 0,
                    temperature_max: 0,
                    weather_icon: "wi-day-sunny",
                    weather_icon_name: "Intermittent clouds",
                }
            ],
            daily_forecast: [
                {
                    datapoint_hour: "00:00",
                    datapoint_date: "July 17",
                    datapoint_time: "July 17, 00:00",
                    data_point_type: "DAILY_FORECAST",
                    location_name: "London, UK",
                    temperature: 0,
                    temperature_min: 15,
                    temperature_max: 24,
                    weather_icon: "wi-cloudy",
                    weather_icon_name: "Heavy Cloud",
                }
            ]
        };
        return Promise.resolve(data);
    }),
}));


let wrapper;

const setUp = async (initialEntries = ['/']) => {
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

    const store = createStore(
        appReducers,
        initialState,
        compose(applyMiddleware(...[thunk]))
    );

    wrapper = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={initialEntries}>
                <ConnectedWeatherContainer />
            </MemoryRouter>
        </Provider>
    );

    await flushPromises();
    wrapper.update();
};

describe('e2e tests for the WeatherContainer', () => {

    afterEach(() => {
        wrapper.unmount();
    });

    it('should render all the weather data', async () => {
        await setUp();

        // Check current weather data
        const weatherContainer = wrapper.find('#current-weather');
        expect(weatherContainer.find('.weather__location').text()).toBe('London, UK');
        expect(weatherContainer.find('.weather__date').text()).toBe('July 16, 18:50');
        expect(weatherContainer.find('.weather__temperature').text()).toBe('26.27°C');
        expect(weatherContainer.find('.weather__icon.wi-cloudy')).toHaveLength(1);
        expect(weatherContainer.find('.weather__icon-name').text()).toBe('Clouds');

        // Check hourly forecast
        const hourlyForecast = wrapper.find('#hourly-forecast');
        expect(hourlyForecast.find('.forecast__top-value-1').text()).toBe('25.9°C');
        expect(hourlyForecast.find('.forecast__top-value-2').text()).toBe('');
        expect(hourlyForecast.find('.weather__icon.wi-day-sunny')).toHaveLength(1);
        expect(hourlyForecast.find('.forecast__bottom-value').text()).toBe('20:00');

        // Check daily forecast
        const dailyForecast = wrapper.find('#daily-forecast');
        expect(dailyForecast.find('.forecast__top-value-1').text()).toBe('Max: 24°C');
        expect(dailyForecast.find('.forecast__top-value-2').text()).toBe('Min: 15°C');
        expect(dailyForecast.find('.weather__icon.wi-cloudy')).toHaveLength(1);
        expect(dailyForecast.find('.forecast__bottom-value').text()).toBe('July 17');
    });

    it('should renders the about page properly', async () => {
        await setUp(['/about']);

        expect(wrapper.find('h1').text()).toBe('About');
    });
});
