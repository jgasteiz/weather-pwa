import React from 'react';
import DataPoint from './DataPoint';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<DataPoint/>', () => {
    it('renders DataPoint properly', () => {
        const props = {
            dpType: 'date',
            topValue1: 'Max: 24',
            topValue2: 'Min: 14',
            icon: 'ic-rain',
            bottomValue: 'July 2',
        };
        const wrapper = shallow(<DataPoint {...props}/>);
        expect(wrapper.find('div.forecast__date').exists()).toBe(true);
        expect(wrapper.find('div.forecast__top-value-1').text()).toBe('Max: 24');
        expect(wrapper.find('div.forecast__top-value-2').text()).toBe('Min: 14');
        expect(wrapper.find('div.forecast__bottom-value').text()).toBe('July 2');
        expect(wrapper.find('i.weather__icon').props().className.includes('ic-rain')).toBe(true);
    });
});
