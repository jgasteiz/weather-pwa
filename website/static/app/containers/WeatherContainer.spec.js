import React from 'react';
import {MemoryRouter} from 'react-router';
import {WeatherContainer} from './WeatherContainer';
import AboutPage from '../components/AboutPage';
import Weather from '../components/Weather';
import {configure, mount, render, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<WeatherContainer/>', () => {
    let props;

    beforeEach(() => {
        props = {
            fetchWeatherData: jest.fn(() => {}),
            isLoading: false,
            currentConditions: {
                locationName: 'London, UK',
                dataTimestamp: '21:30',
                temperature: 26.2,
                weatherIcon: 'ic-sunny',
                weatherName: 'Sunny day!',
            },
            hourlyForecast: [
                {
                    data_point_type: "HOURLY_FORECAST",
                    datapoint_date: "July 16",
                    datapoint_hour: "20:00",
                    datapoint_time: "July 16, 20:00",
                    location_name: "London, UK",
                    temperature: 25.9,
                    temperature_max: 0,
                    temperature_min: 0,
                    weather_icon: "wi-day-sunny",
                    weather_icon_name: "Intermittent clouds",
                }
            ],
            dailyForecast: [
                {
                    data_point_type: "DAILY_FORECAST",
                    datapoint_date: "July 17",
                    datapoint_hour: "00:00",
                    datapoint_time: "July 17, 00:00",
                    location_name: "London, UK",
                    temperature: 0,
                    temperature_max: 24,
                    temperature_min: 15,
                    weather_icon: "wi-cloudy",
                    weather_icon_name: "Heavy Cloud",
                }
            ],
            navigationItems: [
                {title: "Weather", path: "/"},
                {title: "About", path: "/about/"}
            ]
        };
    });

    it('renders WeatherContainer properly', () => {
        const wrapper = shallow(<WeatherContainer {...props}/>);
        // Expect one navigation
        expect(wrapper.find('Navigation').length).toBe(1);

        const navigation = wrapper.find('Navigation');
        expect(navigation.prop('onRefreshClick')).toBe(props.fetchWeatherData);
        expect(navigation.prop('navigationItems')).toEqual(props.navigationItems);

        const weather = wrapper.find('Weather');
        expect(weather.prop('currentConditions')).toEqual(props.currentConditions);
        expect(weather.prop('hourlyForecast')).toEqual(props.hourlyForecast);
        expect(weather.prop('dailyForecast')).toEqual(props.dailyForecast);
        expect(weather.prop('isLoading')).toBe(false);
    });

    it('routes Weather page properly', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
              <WeatherContainer {...props}/>
            </MemoryRouter>
        );
        expect(wrapper.find('AboutPage')).toHaveLength(0);
        expect(wrapper.find('Weather')).toHaveLength(1);
    });

    it('routes About page properly', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/about']}>
              <WeatherContainer {...props}/>
            </MemoryRouter>
        );
        expect(wrapper.find('Weather')).toHaveLength(0);
        expect(wrapper.find('AboutPage')).toHaveLength(1);
    });

    it('loads the initial data', () => {
        mount(
            <MemoryRouter initialEntries={['/']}>
              <WeatherContainer {...props}/>
            </MemoryRouter>
        );
        expect(props.fetchWeatherData).toHaveBeenCalled();
    });

    it('renders the app properly', () => {
        const renderedContainer = render(
            <MemoryRouter initialEntries={['/']}>
              <WeatherContainer {...props}/>
            </MemoryRouter>
        );
        // Check current weather data
        expect(renderedContainer.find('.weather__location').text()).toBe(props.currentConditions.locationName);
        expect(renderedContainer.find('.weather__date').text()).toBe(props.currentConditions.dataTimestamp);
        expect(renderedContainer.find('.weather__temperature').text()).toBe(`${props.currentConditions.temperature}°C`);
        expect(renderedContainer.find('.weather__icon.ic-sunny').length).toBe(1);
        expect(renderedContainer.find('.weather__icon-name').text()).toBe(props.currentConditions.weatherName);

        // Expect 1 hourly forecast datapoint
        const hourlyForecast = renderedContainer.find('.forecast__hour');
        expect(hourlyForecast.find('.forecast__top-value-1').text()).toBe(`${props.hourlyForecast[0].temperature}°C`);
        expect(hourlyForecast.find('.forecast__top-value-2').text()).toBe('');
        expect(hourlyForecast.find('.weather__icon.wi-day-sunny').length).toBe(1);
        expect(hourlyForecast.find('.forecast__bottom-value').text()).toBe(props.hourlyForecast[0].datapoint_hour);

        // Expect 1 daily forecast datapoint
        const dailyForecast = renderedContainer.find('.forecast__date');
        expect(dailyForecast.find('.forecast__top-value-1').text()).toBe(`Max: ${props.dailyForecast[0].temperature_max}°C`);
        expect(dailyForecast.find('.forecast__top-value-2').text()).toBe(`Min: ${props.dailyForecast[0].temperature_min}°C`);
        expect(dailyForecast.find('.weather__icon.wi-cloudy').length).toBe(1);
        expect(dailyForecast.find('.forecast__bottom-value').text()).toBe(props.dailyForecast[0].datapoint_date);
    });
});
