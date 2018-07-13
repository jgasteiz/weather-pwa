import React from 'react';
import Forecast from './Forecast';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<Forecast/>', () => {

    let props = {
        forecastType: 'hour',
        forecastTitle: 'Next random hours',
        dataPoints: [
            {
                datapoint_date: "July 14",
                datapoint_hour: "10:00",
                temperature: 27,
                temperature_max: 30,
                temperature_min: 24,
                weather_icon: "wi-cloudy"
            }, {
                datapoint_date: "July 15",
                datapoint_hour: "11:00",
                temperature: 17,
                temperature_max: 20,
                temperature_min: 14,
                weather_icon: "wi-sunny",
            }
        ],
    };

    it('renders Forecast properly', () => {
        const wrapper = shallow(<Forecast {...props}/>);
        // Should render the title and 2 datapoints.
        expect(wrapper.find('h3').text()).toBe('Next random hours');
        expect(wrapper.find('DataPoint').length).toBe(2);
    });

    it('renders date Forecast', () => {
        props = {...props, forecastType: 'date', forecastTitle: 'Next random days'};
        const wrapper = shallow(<Forecast {...props}/>);

        expect(wrapper.find('h3').text()).toBe('Next random days');
        expect(wrapper.find('DataPoint').length).toBe(2);

        const firstDataPoint = wrapper.find('DataPoint').at(0);
        expect(firstDataPoint.props().topValue1).toBe('Max: 30°C');
        expect(firstDataPoint.props().topValue2).toBe('Min: 24°C');
        expect(firstDataPoint.props().bottomValue).toBe('July 14');
        expect(firstDataPoint.props().icon).toBe('wi-cloudy');

        const secondDataPoint = wrapper.find('DataPoint').at(1);
        expect(secondDataPoint.props().topValue1).toBe('Max: 20°C');
        expect(secondDataPoint.props().topValue2).toBe('Min: 14°C');
        expect(secondDataPoint.props().bottomValue).toBe('July 15');
        expect(secondDataPoint.props().icon).toBe('wi-sunny');
    });

    it('renders hour Forecast', () => {
        props = {...props, forecastType: 'hour', forecastTitle: 'Next random hours'};
        const wrapper = shallow(<Forecast {...props}/>);

        expect(wrapper.find('h3').text()).toBe('Next random hours');
        expect(wrapper.find('DataPoint').length).toBe(2);

        const firstDataPoint = wrapper.find('DataPoint').at(0);
        expect(firstDataPoint.props().topValue1).toBe('27°C');
        expect(firstDataPoint.props().topValue2).toBe(undefined);
        expect(firstDataPoint.props().bottomValue).toBe('10:00');
        expect(firstDataPoint.props().icon).toBe('wi-cloudy');

        const secondDataPoint = wrapper.find('DataPoint').at(1);
        expect(secondDataPoint.props().topValue1).toBe('17°C');
        expect(secondDataPoint.props().topValue2).toBe(undefined);
        expect(secondDataPoint.props().bottomValue).toBe('11:00');
        expect(secondDataPoint.props().icon).toBe('wi-sunny');
    });
});
