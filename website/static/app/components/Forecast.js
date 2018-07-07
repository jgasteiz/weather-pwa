import React from 'react';

import DataPoint from './DataPoint';
import {PropTypes} from "prop-types";


const Forecast = ({forecastType, forecastTitle, dataPoints}) => {

    const forecastDataPoints = dataPoints.map((data, index) => {

        const keyValue = data[_getKeyValueKey()];
        let topValue1 = data[_getTopValue1Key()];
        let topValue2 = data[_getTopValue2Key()];
        const bottomValue = data[_getBottomValueKey()];
        const icon = data[_getIconKey()];

        if (forecastType === 'date') {
            topValue1 = `Max: ${topValue1}°C`;
            topValue2 = `Min: ${topValue2}°C`;
        } else {
            topValue1 = `${topValue1}°C`;
        }

        return (
            <DataPoint
                key={keyValue}
                dpType={forecastType}
                topValue1={topValue1}
                topValue2={topValue2}
                bottomValue={bottomValue}
                icon={icon}
            />
        );
    });

    return (
        <div className="forecast__group">
            <h3>{forecastTitle}</h3>
            <div className="forecast__data-wrp">
                <div className="forecast__data">
                    {forecastDataPoints}
                </div>
            </div>
        </div>
    );

    function _getTopValue1Key () {
        switch (forecastType) {
            case 'hour':
                return 'temperature';
            case 'date':
                return 'temperature_max';
        }
        return null;
    }

    function _getTopValue2Key() {
        switch (forecastType) {
            case 'hour':
                return null;
            case 'date':
                return 'temperature_min';
        }
        return null;
    }

    function _getBottomValueKey() {
        switch (forecastType) {
            case 'hour':
                return 'datapoint_hour';
            case 'date':
                return 'datapoint_date';
        }
        return null;
    }

    function _getKeyValueKey() {
        return _getBottomValueKey();
    }

    function _getIconKey() {
        return 'weather_icon';
    }
};

Forecast.propTypes = {
    forecastType: PropTypes.string.isRequired,
    forecastTitle: PropTypes.string.isRequired,
    dataPoints: PropTypes.array.isRequired,
};

export default Forecast;
