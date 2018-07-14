import React from 'react';
import PropTypes from 'prop-types';


const DataPoint = ({dpType, topValue1, topValue2, icon, bottomValue}) =>
    <div className={`forecast__${dpType}`}>
        <div className="forecast__top-value-1">{topValue1}</div>
        <div className="forecast__top-value-2">{topValue2}</div>
        <div><i className={`weather__icon wi ${icon}`}/></div>
        <div className="forecast__bottom-value">{bottomValue}</div>
    </div>;

DataPoint.propTypes = {
    dpType: PropTypes.string.isRequired,
    topValue1: PropTypes.string.isRequired,
    topValue2: PropTypes.string,
    icon: PropTypes.string.isRequired,
    bottomValue: PropTypes.string.isRequired,
};

export default DataPoint;
