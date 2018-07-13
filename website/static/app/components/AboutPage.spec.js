import React from 'react';
import AboutPage from './AboutPage';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<AboutPage/>', () => {
    const wrapper = shallow(<AboutPage/>);

    it('renders 1 h1 element', () => {
        expect(wrapper.find('h1').length).toBe(1);
    });
    it('renders 2 h2 elements', () => {
        expect(wrapper.find('h2').length).toBe(2);
    });
});
