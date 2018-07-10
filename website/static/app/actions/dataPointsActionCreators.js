export const REQUEST_DATAPOINTS = 'REQUEST_DATAPOINTS';
export const RECEIVE_DATAPOINTS = 'RECEIVE_DATAPOINTS';

const requestDatapoints = () => {
    return {
        type: REQUEST_DATAPOINTS,
    }
};

const receiveDatapoints = (dataPoints) => {
    return {
        dataPoints,
        type: RECEIVE_DATAPOINTS,
    }
};

export const fetchDatapoints = () => {
    return (dispatch) => {
        dispatch(requestDatapoints());
        return fetch('/api/forecast/')
            .then(response => response.json())
            .then(json => dispatch(receiveDatapoints(json)));
    }
};
