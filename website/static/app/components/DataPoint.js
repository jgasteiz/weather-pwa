import React from 'react';
import {PropTypes} from "prop-types";


const DataPoint = ({dpType, topValue1, topValue2, icon, bottomValue}) => {
    return (
        <div className={`forecast__${dpType}`}>
            <div>{topValue1}</div>
            <div>{topValue2}</div>
            <div><i className={`weather__icon wi ${icon}`}/></div>
            <div>{bottomValue}</div>
        </div>
    );
};

DataPoint.propTypes = {
    dpType: PropTypes.string.isRequired,
    topValue1: PropTypes.string.isRequired,
    topValue2: PropTypes.string,
    icon: PropTypes.string.isRequired,
    bottomValue: PropTypes.string.isRequired,
};

export default DataPoint;
