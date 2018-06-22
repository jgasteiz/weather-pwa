import React from 'react';

import DataPoint from './DataPoint.component';

export default class Forecast extends React.Component {

    render() {

        const forecastDataPoints = this.props.dataPoints.map((data, index) => {

            const keyValue = data[this._getKeyValueKey()];
            let topValue1 = data[this._getTopValue1Key()];
            let topValue2 = data[this._getTopValue2Key()];
            const bottomValue = data[this._getBottomValueKey()];
            const icon = data[Forecast._getIconKey()];

            if (this.props.forecastType === 'date') {
                topValue1 = `Max: ${topValue1}°C`;
                topValue2 = `Min: ${topValue2}°C`;
            } else {
                topValue1 = `${topValue1}°C`;
            }

            return (
                <DataPoint
                    key={keyValue}
                    dpType={this.props.forecastType}
                    topValue1={topValue1}
                    topValue2={topValue2}
                    bottomValue={bottomValue}
                    icon={icon}
                />
            );
        });

        return (
            <div className="forecast__group">
                <h3>{this.props.forecastTitle}</h3>
                <div className="forecast__data-wrp">
                    <div className="forecast__data">
                        {forecastDataPoints}
                    </div>
                </div>
            </div>
        );
    }

    // Private methods

    _getTopValue1Key() {
        switch (this.props.forecastType) {
            case 'hour':
                return 'temperature';
            case 'date':
                return 'temperature_max';
        }
        return null;
    }

    _getTopValue2Key() {
        switch (this.props.forecastType) {
            case 'hour':
                return null;
            case 'date':
                return 'temperature_min';
        }
        return null;
    }

    _getBottomValueKey() {
        switch (this.props.forecastType) {
            case 'hour':
                return 'datapoint_hour';
            case 'date':
                return 'datapoint_date';
        }
        return null;
    }

    _getKeyValueKey() {
        return this._getBottomValueKey();
    }

    static _getIconKey() {
        return 'weather_icon';
    }
}
