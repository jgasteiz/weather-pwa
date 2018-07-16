import React from 'react';
import Weather from './Weather';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<Weather/>', () => {
    const props = {
        isLoading: true,
        currentConditions: {
            locationName: 'London, UK',
            dataTimestamp: '21:30',
            temperature: '26.2',
            weatherIcon: 'ic-sunny',
            weatherName: 'Sunny day!',
        },
        hourlyForecast: [1, 2, 3],
        dailyForecast: [4, 5, 6],
    };

    it('renders Weather properly', () => {
        const wrapper = shallow(<Weather {...props}/>);

        // It should be initially loading.
        expect(wrapper.find('.weather__loading').exists()).toBe(true);

        // After setting loading to false, everything else should render.
        wrapper.setProps({...props, isLoading: false});

        expect(wrapper.find('.weather__loading').exists()).toBe(false);

        expect(wrapper.find('.weather__location').text()).toBe('London, UK');
        expect(wrapper.find('.weather__date').text()).toBe('21:30');
        expect(wrapper.find('.weather__temperature').text()).toBe('26.2°C');
        expect(wrapper.find('.ic-sunny').exists()).toBe(true);
        expect(wrapper.find('.weather__icon-name').text()).toBe('Sunny day!');

        // 2 Forecasts should have been rendered
        expect(wrapper.find('Forecast').length).toBe(2);
        const hourlyForecast = wrapper.find('Forecast').at(0);
        const dailyForecast = wrapper.find('Forecast').at(1);
        expect(hourlyForecast.prop('forecastType')).toBe('hour');
        expect(dailyForecast.prop('forecastType')).toBe('date');
        expect(hourlyForecast.prop('dataPoints')).toEqual([1, 2, 3]);
        expect(dailyForecast.prop('dataPoints')).toEqual([4, 5, 6]);
    });
});
