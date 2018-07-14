import React from 'react';
import Navigation from './Navigation';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<Navigation/>', () => {
    const props = {
        onRefreshClick: jest.fn(() => {}),
        navigationItems: [
            {
                title: 'Weather',
                path: '/'
            },
            {
                title: 'About',
                path: '/about/'
            },
        ]
    };

    it('renders Navigation properly', () => {
        const wrapper = shallow(<Navigation {...props}/>);
        expect(wrapper.find('Link').length).toBe(2);

        const weatherLink = wrapper.find('Link').at(0);
        const aboutLink = wrapper.find('Link').at(1);


        expect(weatherLink.prop('to')).toBe('/');
        expect(aboutLink.prop('to')).toBe('/about/');
        expect(weatherLink.children().text()).toBe('Weather');
        expect(aboutLink.children().text()).toBe('About');
    });

    it('calls onRefreshClick when the refresh icon is clicked', () => {
        const wrapper = shallow(<Navigation {...props}/>);
        const refreshLink = wrapper.find('#refresh-weather-data');
        refreshLink.simulate('click');
        expect(props.onRefreshClick).toHaveBeenCalled();
    });
});
