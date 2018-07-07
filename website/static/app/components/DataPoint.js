import React from 'react';

export default class DataPoint extends React.Component {
    render() {
        return (
            <div className={`forecast__${this.props.dpType}`}>
                <div>{this.props.topValue1}</div>
                <div>{this.props.topValue2}</div>
                <div><i className={`weather__icon wi ${this.props.icon}`}/></div>
                <div>{this.props.bottomValue}</div>
            </div>
        );
    }
}
