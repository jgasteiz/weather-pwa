import weatherService from '../services/weatherService';


export const REQUEST_DATAPOINTS = 'REQUEST_DATAPOINTS';
export const RECEIVE_DATAPOINTS_SUCCESS = 'RECEIVE_DATAPOINTS_SUCCESS';


const requestDatapoints = () => {
    return {
        type: REQUEST_DATAPOINTS,
    };
};

const receiveDatapointsSuccess = (weatherData) => {
    return {
        weatherData,
        type: RECEIVE_DATAPOINTS_SUCCESS,
    };
};

export const fetchWeatherData = () => async (dispatch) => {
    dispatch(requestDatapoints());
    const weatherData = await weatherService.fetchWeatherDataPoints();
    dispatch(receiveDatapointsSuccess(weatherData));
};
