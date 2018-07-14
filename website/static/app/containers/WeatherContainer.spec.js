import React from 'react';
import {MemoryRouter} from 'react-router';
import {WeatherContainer} from './WeatherContainer';
import AboutPage from '../components/AboutPage';
import Weather from '../components/Weather';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<WeatherContainer/>', () => {
    let props = {
        fetchWeatherData: jest.fn(() => {}),
        isLoading: false,
        currentConditions: {
            locationName: 'London, UK',
            dataTimestamp: '21:30',
            temperature: '26.2',
            weatherIcon: 'ic-sunny',
            weatherName: 'Sunny day!',
        },
        hourlyForecast: [1, 2, 3],
        dailyForecast: [4, 5, 6],
        navigationItems: [7, 8, 9],
    };

    it('renders WeatherContainer properly', () => {
        const wrapper = shallow(<WeatherContainer {...props}/>);
        // Expect one navigation
        expect(wrapper.find('Navigation').length).toBe(1);

        const navigation = wrapper.find('Navigation');
        expect(navigation.prop('onRefreshClick')).toBe(props.fetchWeatherData);
        expect(navigation.prop('navigationItems')).toEqual([7, 8, 9]);

        const weather = wrapper.find('Weather');
        expect(weather.prop('currentConditions')).toEqual(props.currentConditions);
        expect(weather.prop('hourlyForecast')).toEqual([1, 2, 3]);
        expect(weather.prop('dailyForecast')).toEqual([4, 5, 6]);
        expect(weather.prop('isLoading')).toBe(false);
    });

    it('routes Weather page properly', () => {
        props = {
            ...props,
            navigationItems: [],
            hourlyForecast: [],
            dailyForecast: [],
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
              <WeatherContainer {...props}/>
            </MemoryRouter>
        );
        expect(wrapper.find('AboutPage')).toHaveLength(0);
        expect(wrapper.find('Weather')).toHaveLength(1);
    });

    it('routes About page properly', () => {
        props = {
            ...props,
            navigationItems: [],
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={['/about']}>
              <WeatherContainer {...props}/>
            </MemoryRouter>
        );
        expect(wrapper.find('Weather')).toHaveLength(0);
        expect(wrapper.find('AboutPage')).toHaveLength(1);
    });
});
