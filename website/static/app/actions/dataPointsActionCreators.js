export const REQUEST_DATAPOINTS = 'REQUEST_DATAPOINTS';
export const RECEIVE_DATAPOINTS = 'RECEIVE_DATAPOINTS';

const dataPointsActionCreators = {
    requestDatapoints: function () {
        return {
            type: REQUEST_DATAPOINTS
        }
    },

    receiveDatapoints: function (dataPoints) {
        return {
            dataPoints,
            type: RECEIVE_DATAPOINTS,
        }
    },

    fetchDatapoints : function () {
        return function(dispatch) {
            dispatch(dataPointsActionCreators.requestDatapoints());
            return fetch('/api/forecast/')
                .then(response => response.json())
                .then(json => {
                    return dispatch(dataPointsActionCreators.receiveDatapoints(json));
                });
        }
    }
};

export default dataPointsActionCreators;
